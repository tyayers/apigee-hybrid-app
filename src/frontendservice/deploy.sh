docker build -t local/frontend-react .
docker tag local/frontend-react eu.gcr.io/$1/frontend-react
docker push eu.gcr.io/$1/frontend-react