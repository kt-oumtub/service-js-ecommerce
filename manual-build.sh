
# docker build -t service-js-ecommerce .
docker build -t kittioumtub/service-js-ecommerce .

docker login

docker push kittioumtub/service-js-ecommerce:latest

echo "Success!"