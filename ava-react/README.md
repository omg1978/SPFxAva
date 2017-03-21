## ava-react

Implementation of a SPFx WebPart using the React framework.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp serve
```

### Define the new property of interface - AvanadeReactWebPart.ts

1) Define the new property "url" of interface

```bash
public render(): void {
  const element: React.ReactElement<IAvanadeReactProps > = React.createElement(
    AvanadeReact,
    {
      description: this.properties.description,
      //define the new propery
      url: this.context.pageContext.site.absoluteUrl
    }
  );
```

### Insert the new property "url" in react component - AvanadeReact.tsx

1) Insert the new property in react component, and include comments

```bash
public render(): React.ReactElement<IAvanadeReactProps> {
  return (
    <div className={styles.helloWorld}>
      <div className={styles.container}>
        <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
          <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
            <span className="ms-font-xl ms-fontColor-white">Welcome to Avanade WebCast!</span>
            <p className="ms-font-l ms-fontColor-white">Using React framework..</p>
            <p className="ms-font-l ms-fontColor-white">{escape(this.props.description)}</p>
            {/* New property to show url */}
            <p className="ms-font-l ms-fontColor-white">{escape(this.props.url)}</p>
            <a href="https://aka.ms/spfx" className={styles.button}>
              <span className={styles.label}>Learn more</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Add the property and type - IAvanadeReactProps.ts

1) Add the property and type in the interface

```bash
export interface IAvanadeReactProps {
  description: string;
  //New property to show url
  url: string;
}
```
