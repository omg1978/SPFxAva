import * as React from 'react';
import styles from './AvanadeReact.module.scss';
import { IAvanadeReactProps } from './IAvanadeReactProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class AvanadeReact extends React.Component<IAvanadeReactProps, void> {
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
}
