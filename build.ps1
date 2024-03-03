docker build -t messaging-web .

 docker run  --name messaging-web --network messaging-app -p 127.0.0.1:3000:3000 messaging-web