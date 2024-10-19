
if [ -z "$1" ]; then
  echo "Error!! > Image tag is required."
  exit 1
fi

aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin 123454321.dkr.ecr.ap-southeast-1.amazonaws.com

echo "Building image with tag $1"

docker build -t 123454321.dkr.ecr.ap-southeast-1.amazonaws.com/my-admin-api-cur-curriculum:$1 .
docker build -t 123454321.dkr.ecr.ap-southeast-1.amazonaws.com/my-admin-api-cur-curriculum:latest .

docker push 123454321.dkr.ecr.ap-southeast-1.amazonaws.com/my-admin-api-cur-curriculum:$1
docker push 123454321.dkr.ecr.ap-southeast-1.amazonaws.com/my-admin-api-cur-curriculum:latest

echo "Success!"