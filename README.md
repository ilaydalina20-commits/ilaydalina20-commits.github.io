# İlayda — Vista-inspired portfolio

Static HTML/CSS/JavaScript site for GitHub Pages.

## Publish
1. Create a public GitHub repository named `YOURUSERNAME.github.io`.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder to the repository root.
3. In Settings → Pages, select Deploy from a branch, `main`, `/ (root)`.
4. In Settings → Pages, set custom domain `ilayda.site`.
5. At your domain registrar, add A records for `@` pointing to 185.199.108.153, 185.199.109.153, 185.199.110.153, and 185.199.111.153. Add CNAME `www` pointing to `YOURUSERNAME.github.io`.
6. Wait for DNS propagation and turn on Enforce HTTPS.

## Customize
- Edit `pages` in `script.js` to change titles, copy, and placeholder cards.
- Replace gradient placeholder cards with your own image tags and upload your work into `assets/`.
- `assets/vista-reference.png` is the supplied visual reference. The background is CSS-generated and can be replaced with a separately licensed wallpaper image if desired.
