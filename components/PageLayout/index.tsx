import React, { ReactNode, useEffect } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import cx from "classnames";
import { initGA, logPageView } from "../../utils/analytics";

import BreadCrumb from "../Breadcrumb";
import ErrorBar from "../ErrorBar";

import styles from "./index.scss";

type PropsType = {
  headTitle: string;
  steps: Array<{
    path: string;
    title: StepNameType;
  }>;
  stepName?: StepNameType;
  onSubmit?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
  showError?: boolean; //TODO: update to required once complete refactor
  errorMessage?: string;
};

const PageLayout = ({
  steps,
  stepName,
  onSubmit,
  children,
  headTitle,
  showError,
  errorMessage
}: PropsType) => {
  const router = useRouter();

  useEffect(() => {
    // Scroll to top of page after navigation complete.
    router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, 0);
    });
  }, [router.events]);

  useEffect(() => {
    // Init Google Analytics if needed
    if (window) {
      if (!(window as IMyWindow).GA_INITIALIZED) {
        initGA();
        (window as IMyWindow).GA_INITIALIZED = true;
      }

      // Emit GA pageview
      logPageView(router.pathname);
    }
  }, [router.pathname]);

  return (
    <div>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <div className={styles.Content}>
        <header className={styles.Header}>
          <div>
            <h1 className={styles.HeaderTitle}>
              Systems{" "}
              <span className={styles.HeaderSubtitle}>
                CSA A123.21 test assemblies
              </span>
            </h1>
          </div>
          <a className={styles.HeaderImageWrapper} href="http://iko.com/comm">
            <img
              className={styles.HeaderImage}
              src="/static/iko-logo.png"
              alt="IKO logo"
            />
          </a>
        </header>
        <form className={styles.Layout}>
          <div className={styles.FormBody}>{children}</div>

		  <div className={styles.csaLegalContainer}>
		    <div className={styles.csaLegalContent}>Note: Wind uplift assemblies are suggested based on the required wind pressure value entered. This tool and the results provided are intended as general guidance only, and not as a replacement for professional assistance in specifying a roof assembly for a particular project, taking into account all building conditions and project needs. The recommended wind uplift assemblies are based on the wind pressure value determined solely by the user and IKO assumes no responsibility for any errors in the users calculations of the wind pressure values.</div>
		  </div>

          <footer className={styles.Footer}>
            <ErrorBar errorMessage={errorMessage} showError={showError} />
            <div className={styles.FooterContent}>
              <BreadCrumb showIcon currentStep={stepName} steps={steps} />
              {onSubmit && (
                <button
                  type="submit"
                  className={cx([styles.NextButton])}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    onSubmit(e);
                  }}
                >
                  Next
                </button>
              )}
              {stepName === "Results" && (
                <button
                  type="button"
                  className={cx([styles.NextButton])}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.preventDefault();
                    router.push(steps[0].path);
                  }}
                >
                  Start again
                </button>
              )}
            </div>
          </footer>
        </form>
      </div>
    </div>
  );
};

export default PageLayout;
