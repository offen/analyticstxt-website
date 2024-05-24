FROM nikolaik/python-nodejs:python3.7-nodejs12

ENV PATH "/root/.local/bin:$PATH"
ENV NODE_PATH "/usr/lib/node_modules"

ENV YARNKEY=yarn-keyring.gpg
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmour -o /usr/share/keyrings/$YARNKEY && \
  echo "deb [signed-by=/usr/share/keyrings/$YARNKEY] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN npm install -g postcss-cli@^6.1.3 autoprefixer@^9.7.0 svgo@^1.3.0 cssnano@^4.1.10 \
  && apt-get update \
	&& apt-get install -y libjpeg-progs optipng \
	&& rm -rf /var/lib/apt/lists/*

WORKDIR /code/website
COPY ./website/requirements.txt /code/website/requirements.txt
RUN pip install --user -r requirements.txt

COPY ./website /code/website
COPY ./build /code/build

ARG siteurl
ENV SITEURL=$siteurl
ARG offenaccountid
ENV OFFEN_ACCOUNT_ID=$offenaccountid

RUN make publish
