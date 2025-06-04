# ArchBit Platform

## Platform Overview

ArchBit is a resource hub for software engineers, providing in-depth tutorials, guides, and visual content on a variety of technical topics. Content is organized by category and contributed by the community in markdown (.mdx) format. The site is built with Next.js and uses the Velite package to convert markdown content into JSON for fast, structured access.

### Key Features
- Community-driven blog with categorized resources
- Easy contribution workflow for new content
- Uses Velite for markdown-to-JSON conversion
- Modern, scalable Next.js architecture

---

## Contribution Guide

### 1. Clone the Project

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Velite (if not already installed)

Velite is used as a dev dependency to convert markdown content to JSON.

```bash
npm install velite -D
```

### 4. Build JSON Content with Velite

After adding or updating markdown files, run:

```bash
npx velite
```

This will process your markdown files and generate the necessary JSON data.

- For more details, see the [Velite Quick Start Guide](https://velite.js.org/guide/quick-start).

### 5. Add Your Resource

- **Create a new branch** for your contribution:

  ```bash
  git checkout -b my-new-resource
  ```

- **Add your `.mdx` file** to the appropriate category directory under `/content/blog/<category-name>/`.
  - If your resource's category does not exist, create a new directory for it.

- **Follow the existing markdown format.**
  Here's a sample frontmatter structure:

  ```mdx
  ---
  title: My Resource Title
  description: Short description of the resource.
  date: 2025-05-04
  category: MyCategory
  published: true
  isProjectHeading: false
  ---
  ```

  - The `category` property value determines the resource category in the `/blog` URI.

- **Example file location:**
  `/content/blog/cloud/aws-fundamentals.mdx`

### 6. Submit Your Contribution

- Push your branch and open a pull request with a clear description of your changes.

---

**Special Note:**
- Please ensure your markdown follows the existing structure and frontmatter format.
- The `category` property in the frontmatter determines the resource's category and its URL path.
