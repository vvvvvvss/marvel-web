const aimlCourseData={
    domainName : 'AI-ML',
    courseCode : 'AI-ML-001',
    levels : [
        {
            levelNo : 1,
            levelBadge : 'AI-ML-001-Lv1',
            tasks : [
                {
                    taskNo : 1,
                    description : '[Linear Regression vs Logistic Regression](https://www.javatpoint.com/linear-regression-vs-logistic-regression-in-machine-learning#:~:text=Linear%20regression%20is%20used%20to,given%20set%20of)<br/>a) Predict the price of a home based on multiple different variables using Boston House Dataset (Linear Regression)<br/>b) Train a model to distinguish between different species of the Iris flower based on sepal length, sepal width, petal length, and petal width (Logistic Regression)'
                },
                {
                    taskNo : 2,
                    description : 'Data Visualisation using matplotlib and diff kinds of plots. (Bar, scatter, Time Series and Histogram).'
                },
                {
                    taskNo : 3,
                    description : '[Implement K- Nearest Neighbour Algorithm for Iris dataset](https://towardsdatascience.com/a-simple-introduction-to-k-nearest-neighbors-algorithm-b3519ed98e#:~:text=What%20is%20KNN%3F,how%20its%20neighbours%20ar)'
                },
                {
                    taskNo : 4,
                    description : 'Implement Decision tree based ID3 algorithm using appropriate dataset and apply this to classify a new sample. [ID3 Algorithm](https://iq.opengenus.org/id3-algorithm/)'
                },
                {
                    taskNo : 5,
                    description : 'Implement Naive Bayesian Classifier for text classification. Naive Bayes theorem is based on probabilities of events.<br/> [Naive Bayes Classifiers](https://www.geeksforgeeks.org/naive-bayes-classifiers/)'
                },
                {
                    taskNo : 6,
                    description : 'Ensemble techniques combine the decisions from multiple models to improve the overall performance. Apply the ensemble techniques on the Titanic Dataset<br/>[Guide for ensemble models](https://www.analyticsvidhya.com/blog/2018/06/comprehensive-guide-for-ensemble-models)'
                },
                {
                    taskNo : 7,
                    description : 'Exploratory Data analysis on Airbnb Data. Formulate the scraped data into features that will assist the model to predict the listing’s price using exploratory data analysis on the dataset.<br/>[Exploratory data analysis](https://towardsdatascience.com/exploratory-data-analysis-feature-engineering-and-modelling-using-supermarket-sales-data-part-1-228140f89298)'
                },
                {
                    taskNo : 8,
                    description : 'Hyperparameter Tuning is used to fine-tune a model in order to obtain higher accuracy. Build a cat vs dog classifier and hyper tune in the parameters to obtain higher frequency model.<br/>[Hyperparameter Tuning](https://www.geeksforgeeks.org/hyperparameter-tuning/)'
                },
                {
                    taskNo : 9,
                    description : 'Image Classification using KMeans Clustering Classify a given set of images into a given number of categories using KMeans Clustering using MNIST dataset.<br/>[Image clustering using K Means](https://towardsdatascience.com/image-clustering-using-k-means-4a78478d2b83)'
                },
                {
                    taskNo : 10,
                    description : 'Breast Cancer Classification with the help of Support Vector Machines - Correct and timely diagnosis of Breast Cancer, an exquisite disease is an essential matter in the medical field. Using the concept of Support Vector Machines, detect the possibility of breast cancer.<br/>[Support vector machine algorithm](https://www.freecodecamp.org/news/svm-machine-learning-tutorial-what-is-the-support-vector-machine-algorithm-explained-with-code-examples/)'
                },
                {
                    taskNo : 11,
                    description : 'Building a Machine Learning Model using H20.ai. Build a model and train the predictions using H20 framework (For eg. predicting quality of wine)<br/>[H20 framework](https://www.kdnuggets.com/2020/01/h2o-framework-machine-learning.html)'
                },
                {
                    taskNo : 12,
                    description : 'Build an Artificial Neural Network using Back Propagation Algorithm.<br/>[IBM Neural Networks](https://www.ibm.com/cloud/learn/neural-networks)'
                }
            ]
        },
        {
            levelNo : 2,
            levelBadge : 'AI-ML-001-Lv2',
            tasks : [
                {
                    taskNo : 1,
                    description : 'A Bank wants to take care of customer retention for their product: savings accounts. The bank wants you to identify customers likely to churn balances below the minimum balance in the next quarter. You have the customers information such as age, gender, demographics along with their transactions with the bank. Your task as a data scientist would be to predict the propensity to churn for each customer.'
                },
                {
                    taskNo : 2,
                    description : 'Uber, Lyft, Ola and many more online ride hailing services are trying hard to use their extensive data to create data products such as pricing engines, driver allotment etc. To improve the efficiency of taxi dispatching systems for such services, it is important to be able to predict how long a driver will have his taxi occupied or in other words the trip duration. This project will cover techniques to extract important features and accurately predict trip duration for taxi trips in New York using data from TLC commission New York'
                },
                {
                    taskNo : 3,
                    description : 'Leveraging IBM Watson\'s Natural Language Processing capabilities, you\'ll learn how to plan, implement, test, and deploy chatbots'
                }
            ]
        },
        {
            levelNo : 3,
            levelBadge : 'AI-ML-001-Lv3',
            tasks : [
                {
                    taskNo : 1,
                    description : 'You now have the skills required to work on an AI/ML project of your own. Feel free to use any/all of the skills and equipment you have learnt in the last 2 levels'
                }
            ]
        }
    ]
}

const iotCourseData={
    intro : `When you Google “what is IoT,” many of the answers are unnecessarily technical. <blockquote>“The Internet of Things (IoT) is a system of interrelated computing devices, mechanical and digital machines, objects, animals or people that are provided with unique identifiers and the ability to transfer data over a network without requiring human-to-human or human-to-computer interaction.”<br/><br/> – An unnecessarily technical explanation of IoT.</blockquote> The point is that connecting things to the internet yields many amazing benefits. We’ve all seen these benefits with our smartphones, laptops, and tablets, but this is true for everything else too. And yes, we do mean everything.<br/><br/> The Internet of Things is actually a pretty simple concept,<strong> it means taking all the physical places and things in the world and connecting them to the internet.</strong><br/><br/> When something is connected to the internet, that means that it can send information or receive information, or both. This ability to send and/or receive information makes things “smart."<br/><br/> Let’s use smartphones again as an example. Right now you can listen to just about any song in the world, but it’s not because your phone actually has every song in the world stored on it. It’s because every song in the world is stored somewhere else, but your phone can send information (asking for that song) and then receive information (streaming that song on your phone).<br/><br/> To be smart, a thing doesn't need to have super storage or a supercomputer inside of it - it just needs access to it. All a thing has to do is connect to super storage or to a super computer. In the Internet of Things, all the things that are being connected to the internet can be put into three categories:<br/><br/>\n
    - List item Things that collect information and then send it.\n
    -  Things that receive information and then act on it.
    -  Things that do both.\n<br/>
    And all three of these have enormous benefits that compound on each other.<br/><br/> There are many applications across the sectors and domains and IoT has created a buzz in the tech world. The idea is to start with basics and gradually understand the IoT related concepts by conducting hands-on projects/tasks.<br/><br/>
    ### Pre-Requisites:<br/>
     - Fair understanding of what an Arduino board and a Raspberry pi do, and their applications<br/>
     - Basic knowledge of different kind of sensors and actuators.<br/>
     -  Circuit design<br/>
     - Comfortable with using the Arduino IDE<br/>
     - Blinking an LED using Arduino<br/>
     -  Adding the ESP library to the Arduino IDE<br/> <br/>
     - [Your first experiments](https://www.instructables.com/Your-First-Experiments/)<br/>
     - [Input output](https://www.instructables.com/InputOutput/)<br/>
     - [Skills infusion](https://www.instructables.com/Skills-Infusion/)<br/>
    ### Topics Involved: 
     - Basic Electronics<br/> 
     - Circuit Design<br/> 
     - Arduino<br/>
     - Raspberry Pi<br/> 
     - ESP32<br/>
     - STM32 bluepill<br/>`,
    domainName: 'IOT',
    courseCode: 'IOT-001',
    courseDuration: '6 Months',
    caption : 'An Introductory course on Internet of Things.',
    totalLevels: 3,
    levels : [
        {
            levelNo: 1,
            tasks : [
                {
                    taskNo : 1,
                    description : `### Gather Your (Internet Of) Things<br/><br/>
                    We'll be programming an ESP8266 wifi board using the Arduino software and programming language. How about being notified when a door is opened, your water heater leaks, or there's movement at the bird feeder? OR build a real-time weather monitor, YouTube subscriber counter, or other data-driven project? Combine the coding skills from these two and build an interactive device that both listens and speaks to the internet.<br/>
                    [Gather your Internet of Things](https://www.instructables.com/Gather-Your-Internet-Of-Things/)`
                },
                {
                    taskNo : 2,
                    description: `### Trigger an email.<br/>
                    We will build a basic project that triggers an internet action when a physical switch is activated. The code will detect the switch and send a message to a feed on the cloud data site Adafruit IO. Another cloud services site, IFTTT, will monitor this feed and send an email when activity is detected.<br/> [Circuit-Trigger-Internet-Action](https://www.instructables.com/Circuit-Triggers-Internet-Action/)`
                },
                {
                    taskNo : 3,
                    description : `### Simple Arduino Digital clock without RTC
                    <br/> It's a simple digital clock controlled by Arduino without using any RTC module (Real Time Clock). Every time we switch on this clock we have to set it to the present time, just like the analog clocks found in homes.<br/> [Digital clock without rtc](https://create.arduino.cc/projecthub/Annlee_Fores/simple-arduino-digital-clock-without-rtc-7d4303)`
                },
                {
                    taskNo : 4,
                    description : `### Giftduino, The perfect Arduino Gift Box<br/>
                    This is a simple project to build a gift box.<br/> [Giftduino](https://create.arduino.cc/projecthub/circuito-io-team/giftduino-the-perfect-arduino-gift-box-67083)`
                },
                {
                    taskNo : 5,
                    description : `### Gesture Controlled Robot<br/>
                    This is a Gesture Controlled Robot using Arduino and PAJ7620 Gesture Sensor. The project will explain what PAJ7620 Sensor is, detect various hand gestures and how to control a robot using this sensor.<br/>[Gesture controlled robot](https://create.arduino.cc/projecthub/jithinsanal1610/simple-gesture-controlled-robot-using-arduino-843cf6)`
                },
                {
                    taskNo : 6,
                    description : `Setting up a Raspberry Pi Just the beginning of a whole lot of new things here. Go ahead and [get started](https://www.raspberrypi.com/documentation/computers/getting-started.html)`
                },
                {
                    taskNo : 7,
                    description : `### Music Box with a Raspberry Pi<br/>
                    In this project, you will build a button-controlled “music box” that plays different sounds when different buttons are pressed. [GPIO music box](https://projects.raspberrypi.org/en/projects/gpio-music-box)`
                },
                {
                    taskNo : 8,
                    description : `### Simple and Intuitive Web Interface for Raspberry Pi<br/>
                    The Raspberry Pi is an amazing 35 dollars mini-computer. It allows us to do everything we could do with a regular Linux computer (Connecting to the internet, watching videos, launching applications) and also to interact with the world surrounding it, just like an Arduino. It is a mix between a computer and a microcontroller. In this project we are going to learn how to control LEDs with the Raspberry Pi. Firstly directly from the Raspberry Pi itself, then from any device like the Smartphone or the tablet. [Web interface for your rasberry pi](https://www.instructables.com/Simple-and-intuitive-web-interface-for-your-Raspbe/)`
                },
                {
                    taskNo : 9,
                    description: `### Build a twitter bot with a Raspberry Pi<br/>
                    A great way to build an audience of people interested in the same topic on twitter is by building a twitter bot. Go ahead and try it yourself! [Photo tweeting twitter bot](https://www.makeuseof.com/tag/photo-tweeting-twitter-bot-raspberry-pi-nodejs/)`
                },
                {
                    taskNo : 10,
                    description : `### Communicate with an android app<br/>
                    Exactly like the title says, this will be about establishing communication between your raspberry pi and an android application, using JSON. [Rasberry to android app communication](https://www.instructables.com/Raspberry-Pi-Android-App-communication/)`
                }
            ]
        },
        {
            levelNo : 2,
            tasks : [
                {
                    taskNo : 1,
                    description : `### ESP32-CAM Face Recognition Door Lock System<br/> 
                    Security is the major concern for anyone nowadays, whether it's data security or security of their own home. With the advancement of technology and the increasing use of IoT, digital door locks have become very common these days. Digital lock doesn’t require any physical key but it uses RFID, fingerprint, Face ID, pin, passwords, etc. to control the door lock. Here we build a Face ID controlled Digital Door lock system using ESP32-CAM.  [ESP2-CAM face recognition door lock system](https://circuitdigest.com/microcontroller-projects/esp32-cam-face-recognition-door-lock-system)`
                },
                {
                    taskNo : 2,
                    description : `### Iot Based Air Quality Index Monitoring System<br/>
                    In this project, we are going to build an ESP32 Air Quality Monitoring System using Nova PM SDS011 sensor, MQ-7 sensor, and DHT11 sensor. The air hanging over us thickens with smoke and gaseous emissions from burning fields, industrial factories, and vehicular traffic, blocking out the sun and making it hard to breathe. Experts say that the high levels of air pollution and COVID-19 pandemic can be a dangerous mix that can have serious consequences. The necessity for real-time monitoring of Air Quality is very glaring. This can be done by the help of this project. [Link to tutorial](https://circuitdigest.com/microcontroller-proejcts/iot-based-air-quality-index-monitoring-system-measure-pm25-pm10-co-using-esp3)`
                },
                {
                    taskNo : 3,
                    description : `### Set up your Raspberry Pi server<br/>
                    Set up and configure a Linux server on a raspberry pi. [Setup server](https://www.instructables.com/Ultimate-Pi-Based-Home-Server/)`
                },
                {
                    taskNo : 4,
                    description : `### Home automation using Raspberry Pi<br/>
                    Explore the possibility of controlling AC appliances with the click of buttons on a webpage using internet [Home automation](https://circuitdigest.com/microcontroller-projects/iot-raspberry-pi-home-automation)`
                }
            ]
        },
        {
            levelNo : 3,
            tasks : [
                {
                    taskNo : 1,
                    description : `You now have the skills required to work on an IoT project of your own. Feel free to use 
                    any/all of the skills and equipment you have learnt in the last 2 levels.`
                }
            ]
        }
    ]
}

const DPcourseData={
    domainName : 'D-P', 
    courseCode : 'D-P-001',
    courseDuration : "6 Months",
    caption : "An introductory Course on Design and Prototyping",
    totalLevels: 0,
    intro : `What is the use of an amazing and creative idea if you can't make anything out of it? Some people think that every great idea needs a product behind it. Designing/ Prototyping is the key when developing your product.<br/><br/> Few product developers may not realize the importance of design and prototyping when developing a product. We create prototypes for visual development at the early stage of product designing. Prototyping is utilized to test and validate human factors, ergonomics, mechanical features, and aesthetics in the design process. It is the process of building a model or a draft version of an idea. It is a method of product designing that is used in various applications in mechanical engineering and software development. With prototyping, the potential issues of a product can be detected in the process and massive loss could be avoided.<br/><br/> Prototyping is modeling a set of data or simulating a real-world scenario for research purposes. It is a programming and numeric computing approach used by millions of engineers and scientists to analyze data, develop algorithms, and create models. Be it any domain, converting ideas and concepts into models is the first step using various platforms and tools. <br/><h3>Pre-Requisites:</h3> Logical Thinking<br/>MATLAB Basics<br/>Engineering Drawing <br/>Basic Circuit Elements <br/>Basic CAD commands<br/><h3>Topics Involved: </h3> ·CAD / Autodesk <br/>· MATLAB/ Simulink/ Octave Manufacturing Processes<br/>· Machine Design <br/>· Electronic design: Using Breadboards and reading datasheets <br/>· Build circuits on Perfboards using through-hole components <br/>· Build circuits on Copper-Clad boards using SMD components <br/>· Packaging your electronics design: Using project boxes, Designing custom enclosure and 3D printing it, Building wooden enclosures, Unconventional build methods<br/><h3>Syllabus Overview:</h3> The syllabus contains various exercises that will help you learn to design and prototype through hands-on activities. Use the resources that we provide to learn about the various techniques used in the designing/prototyping process. We will focus on a)mechanical prototyping b) electronics prototyping<br/> The tools and equipment required for hands-on activities are available in the MARVEL lab. We will conduct short workshops on specific days to train you in the handling of equipment, safety, etc. All enrolled members are expected to attend. The date will be informed ahead of time. If enrolled members have any questions, they can ask their domain coordinators`
}

const EVcourseData={
    domainName : 'EV-RE', 
    courseCode : 'EV-RE-001',
    courseDuration : "6 Months",
    caption : "An introductory Course on Electric Vehicles and Renewable Energy.",
    totalLevels: 0,
    intro : `Renewable energy is one of the fastest growing industries on the planet, with billions of dollars invested each year to meet international energy sustainability goals. The focus is to provide a solid foundation for understanding and deploying important renewable energy technologies such as wind and solar. In addition to a good understanding of important energy storage technologies such as pumped hydro, batteries, and hydrogen will help in the long run.<br/><br/>An electric vehicle (EV) is one that operates on an electric motor, instead of an internal-combustion engine that generates power by burning a mixture of fuel and gases. Therefore, such a vehicle is seen as a possible replacement for current-generation automobiles, in order to address the issue of rising pollution, global warming, depleting natural resources, etc. Though the concept of electric vehicles has been around for a long time, it has drawn a considerable amount of interest in the past decade amid a rising carbon footprint and other environmental impacts of fuel-based vehicles.<br/><br>Electric vehicles have low running costs as they have less moving parts for maintenance and are also very environmentally friendly as they use little or no fossil fuels (petrol or diesel). While some EVs used lead acid or nickel metal hydride batteries, the standard for modern battery electric vehicles is now considered to be lithium ion batteries as they have a greater longevity and are excellent at retaining energy, with a self discharge rate of just 5% per month. Despite this improved efficiency, there are still challenges and hence this is one of the topics combined with Renewable Energy to help take up the innovation in the right direction.<br/><h3>Pre-Requisites:</h3>Basic Physics and Understanding of Electric Current and relevant concepts,<br/><h3>Topics Involved:</h3> · Energy & electricity <br/>· Battery Technologies <br/>· Renewable Energy Sources <br/>· Solar Panels <br/>· Electric Vehicles & automobiles <br/>· Motors & Electrical Drawings <br/>· Transformers <br/>· Battery Management System`
}

const CLCYcourseData = {
    domainName : "CL-CY",
    courseCode : "CL-CY-001",
    courseDuration : "6 Months",
    caption : "An Introductory Course on Cloud Computing and Cyber Security.",
    totalLevels : 0,
    intro : "Significant innovations in virtualization and distributed computing, as well as improved access to high-speed internet, have accelerated interest in cloud computing. But what is cloud computing?<br/><br/>According to Microsoft,<blockquote>Simply put, cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet (“the cloud”) to offer faster innovation, flexible resources, and economies of scale. You typically pay only for cloud services you use, helping lower your operating costs, run your infrastructure more efficiently and scale as your business needs change.</blockquote>According to IBM,<blockquote> Cloud computing is on-demand access, via the internet, to computing resources— applications, servers (physical servers & virtual servers), data storage, development tools, networking capabilities, and more—hosted at a remote data center managed by a cloud services provider (or CSP). IaaS (Infrastructure-as-a-Service), PaaS (Platform-as-a-Service), and SaaS (Software-as-a-Service) are the three most common models of cloud services</blockquote>A cloud service has three distinct characteristics that differentiate it from traditional web hosting:<br/><br/>1. Users can access large amounts of computing power on demand. It is typically sold by the minute or the hour.<br/>2. It is elastic. A user can have as much or as little of a service as they want at any given time.<br/>3. The service is fully managed by the provider (the consumer needs nothing but a personal computer and internet access).<br/><br/>Organizations transmit sensitive data across networks and to other devices in the course of doing business, and a significant portion of that data can be sensitive information, whether that be intellectual property, financial data, personal information, or other types of data for which unauthorized access or exposure could have negative consequences. With the internet access and virtualization growth, along with positive developments, there was a sharp rise in the data-theft threats too.<br/><br/>Cyber security is the practice of defending computers, servers, mobile devices, electronic systems, networks, and data from malicious attacks. End-user protection or endpoint security is a crucial aspect of cyber security. After all, it is often an individual (the end-user) who accidentally uploads malware or another form of cyber threat to their desktop, laptop or mobile device. This is the reason that these two topics - Cloud Computing and Cyber Security are bundled together under one domain. <h3>Topics Involved:</h3>Virtualization<br/> Google Cloud<br/> Amazon AWS/Lambda<br/>Microsoft Azure<br/> VMWare<br/>Docker/ Kubernetes<br/>Linux<br/> Networking"
}