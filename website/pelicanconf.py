import os
from datetime import datetime
from pelican_decorate_content import decorate_content

# If your site is available via HTTPS, make sure SITEURL begins with https://
RELATIVE_URLS = False

AUTHOR = 'offen'
SITENAME = 'analytics.txt'
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

# pagination
DEFAULT_PAGINATION = False

THEME = './theme'

# Delete the output directory before generating new files.
DELETE_OUTPUT_DIRECTORY = False
CACHE_CONTENT = True

DIRECT_TEMPLATES = ['sitemap']

# dont create following standard pages
AUTHOR_SAVE_AS = ''
AUTHORS_SAVE_AS = ''
CATEGORY_SAVE_AS = ''
CATEGORIES_SAVE_AS = ''
TAG_SAVE_AS = ''
TAGS_SAVE_AS = ''

SITEMAP_SAVE_AS = 'sitemap.xml'
PAGE_SAVE_AS = '{slug}/index.html'

STATIC_PATHS = []
PLUGIN_PATHS = ['./plugins']
PLUGINS = [decorate_content, 'assets']

MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
        'markdown.extensions.fenced_code': {},
    },
    'output_format': 'html5',
}

DECORATE_CONTENT = {
    'p': ['ma0', 'pb3', 'lineheight-copy'],
    'p > a': ['hilight-yellow-small'],
    'h1': ['f5', 'normal', 'ma0', 'fnt-bold-small'],
    'h2': ['f3', 'f2-ns', 'normal', 'ma0', 'mt5', 'mb3', 'fnt-italic-mid'],
    'h3': ['f5', 'normal', 'ma0', 'mt3', 'mb2', 'fnt-italic-small']
}

GITHUB_REPO = 'https://github.com/offen/analyticstxt/'
INTERNET_DRAFT = 'https://tools.ietf.org/html/draft-ring-analyticstxt-02'
SUBMIT_PRESET = 'https://github.com/offen/analyticstxt-website'
SUBMIT_ISSUE = 'https://github.com/offen/analyticstxt-website/issues'
SEND_EMAIL = 'mailto:hioffen@posteo.de'

OFFEN_ACCOUNT_ID = os.environ.get('OFFEN_ACCOUNT_ID', None)

with open('../build/analytics.txt', 'r') as f:
    ANALYTICS_TXT_CONTENTS = f.read()
