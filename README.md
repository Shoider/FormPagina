**CONAGUA**

---

## Table of Contents

1. [Installation](##installation)
2. [Usage](##usage)

---

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Shoider/FormPagina
   cd first-project
   ```
2. **Prerequisites**
   Docker installed and running.

## Usage

### Docker Setup

1. **Build the Docker image from the project directory:**

```bash
  docker build -t form-ui:v1.0.0 .
```

2. **Run the Docker Container:**

```bash
  docker run --name form-ui -d -p 3000:3000 form-ui:v1.0.0
```

3. **Access the Application**
   Once the container is running, open a web browser and navigate to http://localhost:3000 to access the application.
