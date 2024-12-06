#!/bin/bash

# Kiểm tra xem thư mục node_modules có tồn tại không
if [ ! -d "node_modules" ]; then
  echo "Thư mục node_modules không tồn tại. Đang cài đặt các thư viện..."
  npm install
else
  echo "Thư mục node_modules đã tồn tại. Bỏ qua bước cài đặt."
fi

# Chạy ứng dụng frontend
echo "Đang chạy ứng dụng frontend..."
npm start