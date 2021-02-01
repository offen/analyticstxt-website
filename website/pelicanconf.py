import os
from datetime import datetime

# If your site is available via HTTPS, make sure SITEURL begins with https://
RELATIVE_URLS = False

AUTHOR = 'offen'
SITENAME = 'analyticstxt.org'
PATH = 'content'
TIMEZONE = 'Europe/Berlin'
DEFAULT_LANG = 'en'

BUILD_DATE = datetime.now()

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

SITEURL = 'http://localhost:7000'

DEFAULT_PAGINATION = False

# Delete the output directory before generating new files.
DELETE_OUTPUT_DIRECTORY = False
CACHE_CONTENT = True

# dont create following standard pages
AUTHOR_SAVE_AS = ''
AUTHORS_SAVE_AS = ''
CATEGORY_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
TAG_SAVE_AS = ''
TAGS_SAVE_AS = ''

ARCHIVES_SAVE_AS = 'blog/index.html'
PAGE_SAVE_AS = '{slug}/index.html'
ARTICLE_SAVE_AS = 'blog/{slug}/index.html'

MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
        'markdown.extensions.fenced_code': {},
    },
    'output_format': 'html5',
}
