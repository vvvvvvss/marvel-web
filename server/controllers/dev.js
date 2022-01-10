import course from '../models/course.js';

export const createCourse = async(req, res)=>{
    try {
        
        const courseData = {
            domainName : "CL-CY",
            courseCode : "CL-CY-001",
            courseDuration : "6 Months",
            caption : "An Introductory Course on Cloud Computing and Cyber Security.",
            totalLevels : 0,
            intro : "Significant innovations in virtualization and distributed computing, as well as improved access to high-speed internet, have accelerated interest in cloud computing. But what is cloud computing?<br/><br/>According to Microsoft,<blockquote>Simply put, cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet (“the cloud”) to offer faster innovation, flexible resources, and economies of scale. You typically pay only for cloud services you use, helping lower your operating costs, run your infrastructure more efficiently and scale as your business needs change.</blockquote>According to IBM,<blockquote> Cloud computing is on-demand access, via the internet, to computing resources— applications, servers (physical servers & virtual servers), data storage, development tools, networking capabilities, and more—hosted at a remote data center managed by a cloud services provider (or CSP). IaaS (Infrastructure-as-a-Service), PaaS (Platform-as-a-Service), and SaaS (Software-as-a-Service) are the three most common models of cloud services</blockquote>A cloud service has three distinct characteristics that differentiate it from traditional web hosting:<br/><br/>1. Users can access large amounts of computing power on demand. It is typically sold by the minute or the hour.<br/>2. It is elastic. A user can have as much or as little of a service as they want at any given time.<br/>3. The service is fully managed by the provider (the consumer needs nothing but a personal computer and internet access).<br/><br/>Organizations transmit sensitive data across networks and to other devices in the course of doing business, and a significant portion of that data can be sensitive information, whether that be intellectual property, financial data, personal information, or other types of data for which unauthorized access or exposure could have negative consequences. With the internet access and virtualization growth, along with positive developments, there was a sharp rise in the data-theft threats too.<br/><br/>Cyber security is the practice of defending computers, servers, mobile devices, electronic systems, networks, and data from malicious attacks. End-user protection or endpoint security is a crucial aspect of cyber security. After all, it is often an individual (the end-user) who accidentally uploads malware or another form of cyber threat to their desktop, laptop or mobile device. This is the reason that these two topics - Cloud Computing and Cyber Security are bundled together under one domain. <h3>Topics Involved:</h3>Virtualization<br/> Google Cloud<br/> Amazon AWS/Lambda<br/>Microsoft Azure<br/> VMWare<br/>Docker/ Kubernetes<br/>Linux<br/> Networking"
        }

        const newCourse = new course(courseData);

        const createdCourse = await newCourse.save();

        return res.json({createdCourse : createdCourse});
    } catch (err) {
        console.log(err);
        return res.json(err);
    }
}