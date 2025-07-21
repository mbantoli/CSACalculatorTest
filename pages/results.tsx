import React, { useEffect, useContext, useState } from "react";
import ReactGA from "react-ga";

import Prismic from "prismic-javascript";
import { useRouter } from "next/router";
import cx from "classnames";

import { NRFlowContext } from "../components/NRFlowContext";
import PageLayout from "../components/PageLayout";

import SystemCard from "../components/SystemCard";
import { CheckIcon, DownArrowIcon, RetryIcon } from "../components/Icons";

import { pressureValidator, pressureUnitValidator } from "./index";
import { attachmentValidator } from "./attachment";
import { membraneValidator } from "./membrane";
import { thermalValidator } from "./thermal";
import { coverboardValidator } from "./coverboard";

import styles from "./results.scss";
import Button from "../components/Button";

type ApiComponentType = {
  component_name: string;
  alternatives?: string;
};
type ApiSystemType = {
  id: string;
  data: {
    system_name: string;
    wind_pressure_kpa: number;
    wind_pressure_psf: number;
    membrane: string;
    attachment: string;
    components: Array<ApiComponentType>;
    revit_block?: { url: string };
    system_summary?: { link_type: "Web" | "Any"; url?: string };
    draft_specification?: { link_type: "Web" | "Any"; url?: string };
  };
};

type ComponentType = {
  name: string;
  alternative: string;
};

type SystemType = {
  id: string;
  name: string;
  windPressure: string;
  windPressureUnit: "kpa" | "psf";
  membrane: string;
  attachment: string;
  components: Array<ComponentType>;
  revitBlockDownload?: string;
  systemSummaryLink?: string;
  draftSpecificationLink?: string;
};

type QueryParamsType = {
  windPressure?: string;
  windPressureUnit?: "kpa" | "psf";
  attachment?: string;
  membrane?: string;
  thermal?: string;
  coverBoardType?: string;
  vapourRetarderApplication?: string;
  tags: string;
};

type PropsType = {
  systems: Array<SystemType>;
  error: Error;
};

const apiEndpoint = process.env.API_URL;

const validateParams = (params: QueryParamsType) => {
  const windPressureError = pressureValidator(params.windPressure);
  const windPressureUnitError = pressureUnitValidator(params.windPressureUnit);
  const attachmentError = attachmentValidator(params.attachment);
  const membraneError = membraneValidator(params.membrane);
  // const thermalError = thermalValidator(params.thermal);
  // const coverboardError = coverboardValidator(
  //   JSON.parse(params.coverBoardType)
  // );

  return (
    !windPressureError &&
    !windPressureUnitError &&
    !attachmentError &&
    !membraneError
  );
};

const parseSystemComponents = (systemComponents: Array<ApiComponentType>) => {
  return systemComponents.map(component => {
    return {
      name: component.component_name,
      alternative: component.alternatives
    };
  });
};

const parseSystems = (
  responseSystems: Array<ApiSystemType>,
  windPressureUnit: "kpa" | "psf"
): Array<SystemType> => {
  return responseSystems.map(system => {
    if (!system.data) return null;

    const windPressure =
      windPressureUnit === "kpa"
        ? system.data.wind_pressure_kpa.toString()
        : system.data.wind_pressure_psf.toString();

    return {
      id: system.id,
      name: system.data.system_name,
      windPressure,
      windPressureUnit,
      membrane: system.data.membrane,
      attachment: system.data.attachment,
      components: parseSystemComponents(system.data.components),
      revitBlockDownload: system.data.revit_block
        ? system.data.revit_block.url
        : undefined,
      systemSummaryLink:
        system.data.system_summary.link_type === "Web"
          ? system.data.system_summary.url
          : undefined,
      draftSpecificationLink: system.data.draft_specification
        ? system.data.draft_specification.url
        : undefined
    };
  });
};

type TagType = {
  id: string;
  data: {
    id: string;
  };
};

const generateQueryPredicates = (
  queryParams: QueryParamsType,
  tagIds: Array<TagType>
) => {
  const predicates = [Prismic.Predicates.at("document.type", "roofing-system")];

  if (queryParams.windPressure && queryParams.windPressureUnit) {
    if (queryParams.windPressureUnit === "kpa") {
      predicates.push(
        Prismic.Predicates.inRange(
          "my.roofing-system.wind_pressure_kpa",
          parseFloat(queryParams.windPressure),
          999
        )
      );
    } else {
      predicates.push(
        Prismic.Predicates.inRange(
          "my.roofing-system.wind_pressure_psf",
          parseFloat(queryParams.windPressure),
          999
        )
      );
    }

    tagIds.forEach(tag =>
      predicates.push(
        Prismic.Predicates.at("my.roofing-system.tags.tag", tag.id)
      )
    );

    return predicates;
  }
};

const EmptyResults = () => {
  const router = useRouter();

  return (
    <>
      <span className={styles.EmptyResultsMessage}> No results found.</span>
      <Button
        inline
        onClick={() => {
          router.push("/");
        }}
      >
        Try systems search again
        <span className={styles.EmptyResultsIcon}>
          <RetryIcon />
        </span>
      </Button>
    </>
  );
};

const ComponentAlternatives = ({ alternatives }: { alternatives: string }) => {
  return (
    <ul className={styles.ComponentAlternativeList}>
      {alternatives.split(",").map(alternative => {
        return (
          <li key={alternative} className={styles.ComponentAlternative}>
            {alternative.trim()}
          </li>
        );
      })}
    </ul>
  );
};

const SystemComponents = ({ components }: { components: ComponentType[] }) => {
  const [openAccordians, setOpenAccordians] = useState({});

  const toggleAccordian = (event: React.MouseEvent, key: string) => {
    event.preventDefault();
    setOpenAccordians({
      ...openAccordians,
      [key]: !openAccordians[key]
    });
  };

  return (
    <div className={styles.ComponentList}>
      {components.map((component, i) => {
        const componentKey = `${component.name}-${i}`;
        return (
          <div key={componentKey} className={styles.ComponentGroup}>
            <div className={styles.Component}>
              <span className={styles.ComponentCheck}>
                <CheckIcon />
              </span>
              {component.name}
            </div>
            {component.alternative && (
              <div>
                <button
                  className={styles.Accordion}
                  onClick={e => toggleAccordian(e, componentKey)}
                >
                  <span>Acceptable Alternatives</span>
                  <DownArrowIcon />
                </button>
                <div
                  className={cx(styles.Panel, {
                    [styles.PanelOpen]: !!openAccordians[componentKey]
                  })}
                >
                  <ComponentAlternatives alternatives={component.alternative} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const ResultsPage = (props: PropsType) => {
  const { systems, error } = props;
  const router = useRouter();

  const { setFormState, steps } = useContext(NRFlowContext);
  const queryParams = router.query as QueryParamsType;

  useEffect(() => {
    // Ignore first load when router.query object is empty
    // TODO: Can we prevent the initial empty query object render?
    if (Object.keys(queryParams).length === 0) return;

    if (!error) {
      // setFormState({
      //   ...queryParams
      // });
    } else {
      router.push("/");
    }
  }, [error, queryParams, setFormState, router]);

  return (
    <PageLayout
      headTitle="Roofing Systems | IKO"
      stepName="Results"
      steps={steps}
    >
      <div className={styles.ResultsPage}>
        <h1 className={styles.ResultsPageTitle}>Available Systems</h1>
        {systems.length === 0 && !error ? (
          <EmptyResults />
        ) : (
          <h2 className={styles.Subtitle}>
            {systems.length} Recommended Systems
          </h2>
        )}

        <div className={styles.SystemsList}>
          {systems &&
            systems.map(system => {
              const {
                id,
                windPressure,
                windPressureUnit,
                revitBlockDownload,
                systemSummaryLink,
                draftSpecificationLink,
                components,
                name
              } = system;

              const trackingClickEvent = (event: React.MouseEvent, cTitle: string, cLink: string) => {
                event.preventDefault();
                var filename = cLink.split('\\').pop().split('/').pop();
                var ext = filename.split('.').pop();
                if( ext.toLocaleLowerCase() == "rvt" ){
                  filename = filename.split('_IKO').pop();
                }
                console.log(cTitle+':' + filename);
                ReactGA.event({
                  category: cTitle,
                  action: 'click-to-download',
                  label: filename
                });
                window.open(cLink, "_blank");
              };
              
              return (
                <SystemCard key={id} systemId={name}>
                  <div className={styles.CardSection}>
                    <span className={styles.CardHeading}>
                      Dynamic Wind Uplift Resistance Rating (with 1.5X Safety
                      Factor):{" "}
                    </span>
                    <span className={styles.Kpa}>
                      {windPressure}&nbsp;
                      {windPressureUnit}
                    </span>
                  </div>
                  <div className={cx(styles.CardSection, styles.CardBody)}>
                    <div className={styles.CardHeading}>System Components:</div>
                    {components && <SystemComponents components={components} />}
                  </div>
                  <div className={styles.CardSection}>
                    {systemSummaryLink ? (
                      <a onClick={e => trackingClickEvent(e, 'CSA Calculator Report Downloads', systemSummaryLink)}
                        href={systemSummaryLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className={styles.Download}>
                          Download IKO Summary Report
                        </span>
                      </a>
                    ) : null}
                    {draftSpecificationLink ? (
                      <a onClick={e => trackingClickEvent(e, 'CSA Calculator Report Downloads', draftSpecificationLink)}
                        href={draftSpecificationLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className={styles.Download}>
                          Download Draft Specification
                        </span>
                      </a>
                    ) : null}
                    <a onClick={e => trackingClickEvent(e, 'CSA Calculator CAD Block Downloads', revitBlockDownload)}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.Link}
                      href={revitBlockDownload}
                      download
                    >
                      Download/Access REVIT Block
                    </a>
                  </div>
                </SystemCard>
              );
            })}
        </div>
      </div>
    </PageLayout>
  );
};

ResultsPage.getInitialProps = ({ query }) => {
  const validParams: boolean = validateParams(query);

  if (validParams) {
    query.windPressureUnit === "kpa" ? "kpa" : "psf";

    return Prismic.getApi(apiEndpoint)
      .then(function(api) {
        return api
          .query(Prismic.Predicates.at("document.type", "tag"), {
            fetchLinks: [],
            pageSize: 100
          })
          .then((response: { results: Array<TagType> }) => {
            const tagIds = response.results.filter(result =>
              query.tags.split(",").includes(result.data.id)
            );

            return api.query(generateQueryPredicates(query, tagIds), {
              fetchLinks: [],
              orderings: "[my.roofing-system.wind_pressure_kpa]",
              pageSize: 12
            });
          });
      })
      .then((response: { results: Array<ApiSystemType> }) => {
        return {
          systems: parseSystems(response.results, query.windPressureUnit)
        };
        //TODO: Update Form context with query params data.
      })
      .catch(error => {
        console.error(error);
        return { systems: [], error: new Error("Failed to fetch results.") };
      });
  } else {
    return { systems: [], error: new Error("Invalid query params.") };
  }
};

export default ResultsPage;
