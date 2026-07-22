const url = "https://xircons-dev.vercel.app/project/zero-mock";

fetch(url)
  .then(res => res.text())
  .then(html => {
    const lines = html.split('\n');
    lines.forEach(line => {
      if (line.includes('og:image')) {
        console.log(line.trim());
      }
    });
  })
  .catch(err => console.error(err));
