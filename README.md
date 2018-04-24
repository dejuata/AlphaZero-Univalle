# AlphaZero Univalle
Artificial intelligence course project

### Requirements

  - [Docker](https://docs.docker.com/install/)
  - [Docker Compose](https://docs.docker.com/compose/install/)
  

Clone the project and execute

`docker-compose up --build`

and go to 

http://localhost:5000/

### Execution by virtualenv

1.  Install virtualenv (Ubuntu)

  ```
  $ sudo apt-get install python-virtualenv virtualenv
  ```

or

  ```
  $ sudo pip install virtualenv
  ```
  
2. Create virtual environment

  ```
  $ virtualenv env --python=python3
  ```
  
3. Activate virtual environment

  ```
  $ source env/bin/activate
  ```
  
4. Enter the app folder and execute 
  ```
  $ cd app
  $ pip intall -r requirements.txt
  $ python app.py
  ```
  
5. and go to 

  http://localhost:5000/
