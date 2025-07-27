'use client';

import { useState, useEffect } from 'react';

export default function Terminal() {
  const [history, setHistory] = useState(['Welcome to Pandurang Zure\'s portfolio. Type "help" to begin.']);
  const [input, setInput] = useState('');
  const [projects, setProjects] = useState([]);

  const commands = {
    help: `about - Who am I\nprojects - List of my works\ncontact - How to reach me\nclear - Clears the terminal\nskills - my Tech stack`,
    about: "👋 Hi, I'm Pandurang Zure - A full-stack developer skilled in React, Python, and modern web tools.",
    contact: "📧 zurepandurang@gmail.com\n🔗 github.com/pzure | linkedin.com/in/pzure",
    clear: '',
    skills: "Figma\nHTML\nCSS\nBootstrap\nTailwind\nSass\nJavaScript\nReact JS\nNext JS\nGSAP\nFirebase\nVite\nWebpack\nWordPress\nGithub\nGit",
    
  };

  useEffect(() => {
    // fetch project data from your API
    fetch('https://raw.githubusercontent.com/PANDURANGZURE/api-project/refs/heads/main/project-api.json')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(() => {
        setProjects([{ title: 'Error', description: 'Could not load projects' }]);
      });
  }, []);

  const handleCommand = (cmd) => {
    if (cmd === 'clear') {
      setHistory([]);
    } else if (cmd === 'projects') {
      const output = projects.map((p, i) => {
        const linkText = p.link ? `\n   🔗 Live: <a href="${p.link}" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">${p.link}</a>` : '';
        return `📦 ${p.title} — ${p.description}${linkText}`;
      }).join('\n\n');
      setHistory((prev) => [...prev, `> ${cmd}`, output]);
    } else {
      const output = commands[cmd] || `command not found: ${cmd}`;
      setHistory((prev) => [...prev, `> ${cmd}`, output]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="w-full h-screen p-4 overflow-y-auto bg-black text-green-400 font-mono">
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: line }}></div>
      ))}
      <div className="flex">
        <span className="mr-2">{'>'}</span>
        <input
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-none outline-none text-green-400 w-full"
        />
      </div>
    </div>
  );
}
