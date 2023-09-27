from bs4 import BeautifulSoup
import requests
import pandas as pd
import datetime as dt
import re
from wordcloud import WordCloud, STOPWORDS
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
def reviews(p):
  review_titles = []
  review_dates_original = []
  review_dates = []
  review_ratings = []
  review_texts = []
  page_number = []
  
  # Set Trustpilot page numbers to scrape here  
  from_page = 1
  to_page = 1
  to_page = int(p.get('page'))
  
  for i in range(from_page, to_page + 1):
    response = requests.get(f"https://uk.trustpilot.com/review/{p.get('web')}?page={i}")
    # response = requests.get(f"https://uk.trustpilot.com/review/www.johnlewis.com?page=1")
    web_page = response.text
    soup = BeautifulSoup(web_page, "html.parser")

    for review in soup.find_all(class_ = "styles_reviewContentwrapper__zH_9M"):
        # Review titles
        review_title = review.find(class_ = "typography_heading-s__f7029 typography_appearance-default__AAY17")
        review_titles.append(review_title.getText())

        # Review dates
        review_date_original = review.select_one(selector="time")
        review_dates_original.append(review_date_original.getText())
        
        # Convert review date texts into Python datetime objects
        review_date = review.select_one(selector="time").getText().replace("Updated ", "")
        if "hours ago" in review_date.lower() or "hour ago" in review_date.lower() or "minutes ago" in review_date.lower():
            review_date = dt.datetime.now().date()
        elif "a day ago" in review_date.lower():
            review_date = dt.datetime.now().date() - dt.timedelta(days=1)
        elif "days ago" in review_date.lower():
            review_date = dt.datetime.now().date() - dt.timedelta(days=int(review_date[0]))
        else:
            review_date = dt.datetime.strptime(review_date, "%d %b %Y").date()
        review_date = review_date.strftime('%Y-%m-%d')
        review_dates.append(review_date)
        
        # Review ratings
        review_rating = review.find(class_ = "star-rating_starRating__4rrcf star-rating_medium__iN6Ty").findChild()
        review_rating = int(re.findall('\d',review_rating['alt'])[0])
        review_ratings.append(review_rating)
        
        # When there is no review text, append "" instead of skipping so that data remains in sequence with other review data e.g. review_title
        review_text = review.find(class_ = "typography_body-l__KUYFJ typography_appearance-default__AAY17 typography_color-black__5LYEn")
        if review_text == None:
            review_texts.append("")
        else:
            review_texts.append(review_text.getText())
        
        # Trustpilot page number
        page_number.append(i)
  global comments 
  comments = review_texts
  # Create final dataframe from lists
  df_reviews = pd.DataFrame(list(zip(review_titles, review_dates_original, review_dates, review_ratings, review_texts, page_number)),
                columns =['review_title', 'review_date_original', 'review_date', 'review_rating', 'review_text', 'page_number'])
  return df_reviews.to_json(orient="records",date_format='iso',date_unit='ns')


def wordcloud():
  
   
   comment = ''
   stopwords = set(STOPWORDS)
 
  
   for val in comments:

    val = str(val)
    
    tokens = val.split()
    for i in range(len(tokens)):
        tokens[i] = tokens[i].lower()
     
    comment += " ".join(tokens)+" "
   cloud = WordCloud(width = 600, height = 500,
                background_color ='white',
                stopwords = stopwords,
                min_font_size = 10).generate(comment)
 
                      
   plt.figure(figsize = (8, 8), facecolor = None)
   plt.imshow(cloud)
   plt.axis("off")
   plt.tight_layout(pad = 0)
   return plt







