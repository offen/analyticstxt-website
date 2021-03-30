# This file is only used if you use `make publish` or
# explicitly specify it as your config file.

import os
import sys
sys.path.append(os.curdir)
from pelicanconf import *

# If your site is available via HTTPS, make sure SITEURL begins with https://
SITEURL = os.environ.get('SITEURL', 'https://www.analyticstxt.org')

FEED_ALL_ATOM = 'feeds/all.atom.xml'

DELETE_OUTPUT_DIRECTORY = True

PLUGINS += ['optimize_images']
