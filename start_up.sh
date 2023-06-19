#!/bin/bash
if [[ ! -e "./data/setup_key" ]]; then
    
    cd data
    echo "Generating setup key"
    echo -n "$(openssl rand -hex 16)" | tee ./setup_key
    echo ""
    cd ../
fi
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000 &
node server.js
