docker build -t local/productcatalogservice .
docker tag local/productcatalogservice eu.gcr.io/$1/productcatalogservice
docker push eu.gcr.io/$1/productcatalogservice