# OKD Deployment Tester

This project is specifically designed to test the **Import from Git** functionality in OKD / OpenShift.
It provides various branches, tags, and commits with distinct visual indicators so you can easily verify that the deployment successfully pulled the correct reference.

## Repository Details
- **Git Repo URL:** `https://github.com/b6428259/odk-test-ion.git`

---

## 🚀 How to Test in OKD

When deploying via "Import from Git" in OKD, you can configure the **Git reference** and **Context dir** fields. Follow the scenarios below to verify different deployment behaviors:

### 1. Testing Branches 🌿
Enter one of the following in the **Git reference** field:
- `main` 🔥 Default branch, deploying **Version 1.1.0**.
- `dev` 🚧 Development branch, deploying **Version 1.2.0-dev**.

### 2. Testing Tags 🏷️
Enter one of the following in the **Git reference** field to test pulling a specific tagged release:
- `v1.0.0` 🏛️ Initial version, deploying **Version 1.0.0**.
- `v1.1.0` 🚀 Updated version, deploying **Version 1.1.0**.

### 3. Testing Commits 📦
Enter a specific commit hash in the **Git reference** field to verify deterministic deployments from a commit:
- `b4c9218` ⏩ Deploys **Version 1.0.0** (Initial Commit).
- `5b7b617` ⏩ Deploys **Version 1.1.0** (Update Commit).
- `af426b2` ⏩ Deploys **Version 1.2.0-dev** (Dev Branch Commit).

### 4. Testing Context Directory 📂
You can test the **Context dir** field by deploying a deeply nested application. 
- **Git reference:** `context-test`
- **Context dir:** `/app-v2`
- **Expected Result:** The deployed app will show **Context Dir Test**. 

> **Note:** For all other branches/tags, you can leave the **Context dir** field empty or root (`/`).

---

## 📝 How to Fill the "Import from Git" Form in OKD
To get the best testing experience, here is exactly what you should fill in the form fields. This matches the OKD UI precisely:

### 1. Git & Context Configuration
- **Git Repo URL:** `https://github.com/b6428259/odk-test-ion.git`
- **Git reference:** *(Choose ONE of the branches, tags, or commit hashes from the list above. e.g., `dev` or `v1.0.0`)*
- **Context dir:** `/` *(Change to `/app-v2` ONLY if you are testing the `context-test` branch)*

### 2. General Configuration
- **Application name:** `odk-test-ion-git-app` *(Leave as default to group all tests together)*
- **Name:** *We recommend changing this to match what you are testing so you don't overwrite previous tests. Examples: `test-branch-dev`, `test-tag-v1`, `test-commit-01`.*

### 3. Builder & Deploy Options
- **Builder Image:** `Node.js 22-minimal` *(OKD should auto-detect this because of `package.json`)*
- **Target port:** `8080` *(Required: The Node.js application is configured to listen on port 8080)*
- **Create a route:** `[X] Checked` *(So you can access the web page after it deploys)*

Once you have filled this out, click **Create** and wait for the Pod to build and deploy. When you click the resulting Route URL, the webpage will show you exactly which version successfully deployed!

---

## What does the app show?
This Node.js app serves a static `index.html` page that natively displays:
- The custom version string injected directly into the HTML corresponding to the branch/tag/commit.
- The Git Branch / Tag Reference (`OPENSHIFT_BUILD_REFERENCE` env var).
- The Git Commit Hash (`OPENSHIFT_BUILD_COMMIT` env var).
- The Kubernetes Pod Name (`HOSTNAME` env var).
- The Project Namespace (`OPENSHIFT_BUILD_NAMESPACE` env var).

This allows you to visually verify that OKD correctly injected the build references and ran the correct version of the source code.
