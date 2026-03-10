<div style="display: inline-block; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;"><div style="display: flex; align-items: center; gap: 12px; user-select: none;"><div style="display: flex; align-items: center; gap: 8px;"><span style="color: #3BB273; font-family: 'SF Mono', 'Fira Code', monospace; font-size: 20px;">$</span><span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background-color: #3BB273;"></span></div><div style="display: flex; flex-direction: column; line-height: 1.2;"><span style="color: #E5E7EB; font-size: 20px; font-weight: 600; letter-spacing: -0.02em;">iwashere</span></div></div><div style="margin-left: 32px;"><span style="color: #9CA3AF; font-size: 14px; font-family: 'SF Mono', 'Fira Code', monospace;">Commit context, not code</span><div style="height: 3px; width: 48px; background-color: #3BB273; margin-top: 4px; border-radius: 2px;"></div></div></div>


## About
iwashere is a CLI tool that remembers where you left off in your coding projects. No more asking "What was I working on?" every time you come back to your code.

```bash
# When you stop working
$ iwashere add "Implementing JWT auth, stuck on token refresh"

# Next day
$ iwashere status
You were working on 'feature/auth' (2 hours ago)
Last note: Implementing JWT auth, stuck on token refresh
Modified files: src/auth/jwt.go
...
```

## Features
|Feature|	Description|
|-------|-------------|
|Git Integration	|Automatically captures branch and commit context|
|Session Tracking|	Group related notes with pause/resume|
|Team Sharing	|Encrypted note sharing with teammates|
|Cross-Platform	|Works on Linux, macOS, and Windows|
|Self-Updating|	One command: iwashere update|
|Privacy First|	Your data stays on your machine|
|Reminders	|Never forget to follow up|

## Quick Install
### Linux
```bash
curl -L https://github.com/Murchoid/iwashere/releases/download/iwashere_linux_amd64.tar.gz | tar xz
sudo mv iwashere /usr/local/bin/
```

### macOS
```bash
brew tap Murchoid/homebrew-iwashere
brew install Murchoid/tap/iwashere
```

### Windows
```bash
scoop bucket add iwashere https://github.com/Murchoid/scoop-iwashere
scoop install iwashere
```

## Quick Start
```bash
# Initialize in your project
cd your-project
iwashere init

# Add your first note
iwashere add "Working on authentication feature"

# See where you left off
iwashere status

# Start a session
iwashere session start "Auth Work"
iwashere add "Implement JWT validation" --tags auth,jwt
iwashere session end
```

## Documentation
|Section	|Description|
|----------|-----------|
|Getting Started	|Install and initialize
|Commands	|All commands reference
|Sessions	|Work session management
|Tags	|Organize your notes
|Git Integration	|Branch-aware notes
|Team Features	|Share with teammates
|FAQ	|Troubleshooting

## Example Workflow
```bash
# Monday morning
$ cd ~/projects/api-service
$ iwashere status
No active session
Last note: "Fix rate limiting bug" (3 days ago)
...

# Start fresh session
$ iwashere session start "Add new endpoints"
Session 'Add new endpoints' started

# Add notes as you work
$ iwashere add "Design POST /users schema" --session --tags design
$ iwashere add "Implement validation middleware" --session --tags implementation

# Lunch break
$ iwashere session pause
Session paused (total: 2h 15m)

# After lunch
$ iwashere session continue
Session continued

# End of day
$ iwashere session end --summary "Added 3 new endpoints, tests passing"
Session ended (total: 4h 30m)

# Next morning
$ iwashere status
Last session: 'Add new endpoints' (4h 30m)
Last note: Implement validation middleware
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository

Create your feature branch (git checkout -b feature/amazing)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing)

Open a Pull Request

## Building from Source
```bash
git clone https://github.com/Murchoid/iwashere.git
cd iwashere
go build -o iwashere ./cmd/iwashere
sudo mv iwashere /usr/local/bin/
```

## License
MIT License - see LICENSE for details.

## Acknowledgments
Built with Go

used to build itself

Inspired by the need to remember context across coding sessions

## Contact
[GitHub Issues](https://github.com/Murchoid/iwashere/issues): Report a bug

Discussions: Join the conversation

Twitter/X: @iwashere

<div align="center"> <sub>Built with ❤️ in Kenya</sub> <br/> <sub>© 2026 iwashere. MIT Licensed.</sub> </div> 