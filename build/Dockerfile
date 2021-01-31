FROM nikolaik/python-nodejs:python3.7-nodejs12

ENV PATH "/root/.local/bin:$PATH"
ENV NODE_PATH="/usr/lib/node_modules"

WORKDIR /code/website
COPY ./website/requirements.txt /code/website/requirements.txt
RUN pip install --user -r requirements.txt

COPY ./website /code/website

ARG siteurl
ENV SITEURL=$siteurl

RUN make publish && rm -rf output/theme/.webassets-cache
