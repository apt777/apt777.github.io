# Private Deployment Notes

This repository is now structured as a static personal workspace, but static HTML alone cannot provide strong access control.

## Important constraint

If you publish this site as a normal public static site, every HTML, CSS, JS, and asset file can be requested directly by anyone who knows the URL.

Client-side password prompts, hidden links, or `robots.txt` are not real security controls.

## Recommended deployment directions

### Option A: Put the site behind an identity-aware access layer

Best fit if you want to open the site from anywhere on the Internet, but only after authenticating as yourself.

Suggested shape:

1. Host the static files on a normal origin.
2. Put the origin behind an authenticated access proxy.
3. Allow only your own identity provider account.

Good examples:

- Cloudflare Access in front of a self-hosted static site or protected bucket
- A reverse proxy with SSO in front of the static files

### Option B: Keep the site off the public Internet entirely

Best fit if you want the strongest privacy with the smallest public attack surface.

Suggested shape:

1. Run the site on a private machine or private VM.
2. Access it only over a private network or VPN.
3. Do not expose the origin directly to public DNS.

## GitHub Pages note

This repository currently looks like a personal GitHub Pages repository.

Normal personal GitHub Pages hosting is not the right place for a truly private journal. Private GitHub Pages access control is limited to organization project sites on GitHub Enterprise Cloud.

## Content policy for this repo

Until the final hosting model is chosen:

- Do not store secrets in the repository.
- Do not commit anything you would regret exposing publicly.
- Keep truly sensitive notes in a separate protected system.

## Next implementation step

Once you choose a deployment path, add one of these:

- a reverse proxy config with SSO
- a private network access flow
- a deployment config for a protected static bucket
