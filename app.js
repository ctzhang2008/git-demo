const express = require('express');
const app = express();
const port = 3000;

const projectInfo = {
  name: 'Git Demo Project',
  version: '1.0.0',
  description: '一个用于演示 CI/CD 流程的示例项目',
  author: 'dx21001hi',
  deployedAt: new Date().toISOString()
};

const features = [
  { icon: '🚀', title: '自动化部署', desc: 'GitHub Actions 自动构建和部署' },
  { icon: '📦', title: 'Express 服务', desc: '基于 Node.js 的 Web 服务器' },
  { icon: '🔄', title: '持续集成', desc: '每次推送自动运行测试' },
  { icon: '🌐', title: '实时监控', desc: '服务运行状态实时展示' }
];

const stats = [
  { label: '运行状态', value: '在线', color: '#22c55e' },
  { label: '部署来源', value: 'GitHub Actions', color: '#3b82f6' },
  { label: 'Node.js 版本', value: process.version, color: '#a855f7' },
  { label: '运行端口', value: String(port), color: '#f59e0b' }
];

function generateHtml() {
  const featuresHtml = features.map(f => `
        <div class="card">
          <div class="card-icon">${f.icon}</div>
          <div class="card-title">${f.title}</div>
          <div class="card-desc">${f.desc}</div>
        </div>
      `).join('');

  const statsHtml = stats.map(s => `
        <div class="stat-card" style="border-left-color: ${s.color}">
          <div class="stat-label">${s.label}</div>
          <div class="stat-value" style="color: ${s.color}">${s.value}</div>
        </div>
      `).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${projectInfo.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%);
      min-height: 100vh;
      color: #fff;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .header {
      text-align: center;
      padding: 40px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      margin-bottom: 40px;
    }
    .header h1 {
      font-size: 2.5rem;
      margin-bottom: 10px;
      background: linear-gradient(90deg, #60a5fa, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .header p { color: #94a3b8; font-size: 1.1rem; }
    .status-badge {
      display: inline-block;
      background: #22c55e;
      color: #000;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-top: 15px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }
    .card {
      background: rgba(255,255,255,0.05);
      border-radius: 12px;
      padding: 25px;
      border: 1px solid rgba(255,255,255,0.1);
      transition: transform 0.3s, background 0.3s;
    }
    .card:hover {
      transform: translateY(-5px);
      background: rgba(255,255,255,0.08);
    }
    .card-icon { font-size: 2.5rem; margin-bottom: 15px; }
    .card-title { font-size: 1.2rem; font-weight: 600; margin-bottom: 8px; }
    .card-desc { color: #94a3b8; font-size: 0.9rem; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 15px;
      margin-bottom: 40px;
    }
    .stat-card {
      background: rgba(255,255,255,0.05);
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      border-left: 4px solid;
    }
    .stat-card:nth-child(1) { border-color: #22c55e; }
    .stat-card:nth-child(2) { border-color: #3b82f6; }
    .stat-card:nth-child(3) { border-color: #a855f7; }
    .stat-card:nth-child(4) { border-color: #f59e0b; }
    .stat-label { color: #94a3b8; font-size: 0.85rem; margin-bottom: 5px; }
    .stat-value { font-size: 1.3rem; font-weight: 600; }
    .footer {
      text-align: center;
      padding: 30px;
      color: #64748b;
      font-size: 0.9rem;
      border-top: 1px solid rgba(255,255,255,0.1);
    }
    .footer a { color: #60a5fa; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 ${projectInfo.name}</h1>
      <p>${projectInfo.description}</p>
      <span class="status-badge">● 运行正常</span>
    </div>

    <div class="grid">
      ${featuresHtml}
    </div>

    <div class="stats-grid">
      ${statsHtml}
    </div>

    <div class="footer">
      <p>Deployed via <a href="https://github.com/features/actions">GitHub Actions</a> |
         ${projectInfo.name} v${projectInfo.version}</p>
      <p style="margin-top: 8px; font-size: 0.8rem;">
        部署时间：${projectInfo.deployedAt}
      </p>
    </div>
  </div>
</body>
</html>`;
}

app.get('/', (req, res) => {
  res.send(generateHtml());
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    project: projectInfo,
    stats: stats,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`项目运行在 http://localhost:${port}`);
});
