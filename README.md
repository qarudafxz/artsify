![alt text](202405062243.gif)

<h3 align="center">🎨 Artsify | Desktop Application for Generating New Art with VGG19 Neural Transfer 🎨</h3>
<p align="center">
  <!-- <a href="https://github.com/sindresorhus/awesome"> -->
    <img alt="Awesome Badge" src="https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg" height="20">
  <!-- </a> -->
  </a>
</p>

## 📑 Contents

- [:book: About](#book-about)
- [:toolbox: Setup Instructions](#toolbox-setup-instructions)

## :book: About

**Artsify** is a desktop application designed to help artists generate new ideas and abstracts. Utilizing neural transfer and computer vision technologies, Artsify enables artists to create new masterpieces by manipulating and reimagining existing artwork. 

In this repo, you can:

- [x] Test the application
- [x] Know how to build a desktop application integrating machine learning models
- [x] Run an existing project cloned from GH. 

## :toolbox: Setup Instructions

<p>Please follow the instructions below to set up this project in your local machine.</p>

<br />
<h4>👉 Clone the repository </h4>

```bibtex 
 git clone https://github.com/qarudafxz/artsify.git
```

<h4>👉 Change directory to its src folder and type install the required dependencies with your package manager of choice </h4>

```bibtex 
 cd artsify && code . && bun install
```

<h4>👉 Run the front end </h4>

```bibtex
 npm run dev
 yarn dev 
 bun dev
```

<h4>👉 Change directory to the /api folder and install the required dependencies to run the backend. Make sure that you have installed the latest version of python and pip </h4>

```bibtex 
 //to check your python and pip version, type
 python -v && pip --version

 cd /api && pip install -r requirements.txt
```

<h4>👉 Run the back end </h4>

```bibtex 
 uvicorn main:app -reload
 fastapi dev main.py
```

<p>P.S. For better back end performance, minimum of RTX3060 for the GPU is required since the model is in depend for computing power.</p>

You are all set!


<br />
2024 © Team Epochs | Tin-ao, Tinto, Jamero | CSC126 Final Project
