const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('✅ CI/CD 部署成功！来自 GitHub Actions 自动部署');
});

app.listen(port, () => {
  console.log(`项目运行在 http://localhost:${port}`);
});