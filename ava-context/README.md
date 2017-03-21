## ava-context

Demo retrieve context information and deploy in SharePoint Online from an SPFx WebPart.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp serve
```

### Show context properties to WebPart - AvanadeContextWebPart.ts

1) Insert new properties from SharePoint Context using "this.context.pageContext"

```bash
<p class="ms-font-l ms-fontColor-white">Web Title: <b>${escape(this.context.pageContext.web.title)}</b></p>
<p class="ms-font-l ms-fontColor-white">Web Url: <b>${escape(this.context.pageContext.web.absoluteUrl)}</b></p>
```

### Deploy the WebPart to SharePoint Online - write-manifests.json

1) Fill "cdnBasePath" parameter whith the document library Site as CDN (create the document library if needed).Use the url of your Tenant

```bash
{
  "cdnBasePath": "https://sp13.sharepoint.com/sites/SPFx/avacontext/"
}
```

2) Generate the files to deploy in the SharePoint Library (\ava-context\temp\deploy\)

```bash
gulp bundle --ship
```

3) Create a .spapp file for this webpart to upload in App Catalog (\ava-context\sharepoint\solution\)

```bash
gulp package-solution --ship
```

### Get SharePoint lists & libraries (local and SharePoint) using mocks

...
