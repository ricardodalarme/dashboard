import { MdFolderOpen } from 'react-icons/md';

import { useMemo, useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import { useNavigate, useParams } from '@tanstack/react-router';

import { AccordionItemBuilds } from '@/types/tree/TreeDetails';

import StatusChartMemoized, {
  Colors,
  IStatusChart,
} from '../StatusChart/StatusCharts';

import LinksGroup from '../LinkGroup/LinkGroup';

import { Button } from '../ui/button';

import { IAccordionItems } from './Accordion';

export interface IBuildAccordionContent {
  testStatus: {
    failTests: number;
    errorTests: number;
    passTests: number;
    skipTests: number;
  };
  kernelImage?: string;
  buildLogs?: string;
  kernelConfig?: string;
  dtb?: string;
  systemMap?: string;
  modules?: string;
}

export interface ILinksGroup {
  kernelImage?: string;
  buildLogs?: string;
  kernelConfig?: string;
  dtb?: string;
  systemMap?: string;
  modules?: string;
}

const blueText = 'text-blue';

const AccordionBuildContent = ({
  accordionData,
}: IAccordionItems): JSX.Element => {
  const { treeId } = useParams({ from: '/tree/$treeId/' });

  const navigate = useNavigate({ from: '/tree/$treeId' });

  const contentData = accordionData as AccordionItemBuilds;

  const navigateToBuildDetails = useCallback(() => {
    navigate({
      to: `/tree/${treeId}/build/${contentData.id}`,
      params: { treeId },
      search: prev => prev,
    });
  }, [contentData.id, navigate, treeId]);

  const chartElements: IStatusChart['elements'] = useMemo(() => {
    return [
      {
        value: contentData.testStatus?.passTests ?? 0,
        label: 'buildAccordion.testSuccess',
        color: Colors.Green,
      },
      {
        value: contentData.testStatus?.errorTests ?? 0,
        label: 'buildAccordion.testError',
        color: Colors.Red,
      },
      {
        value: contentData.testStatus?.skipTests ?? 0,
        label: 'buildAccordion.testSkipped',
        color: Colors.DimGray,
      },
      {
        value: contentData.testStatus?.missTests ?? 0,
        label: 'buildAccordion.testMiss',
        color: Colors.Gray,
      },
      {
        value: contentData.testStatus?.failTests ?? 0,
        label: 'buildAccordion.testFail',
        color: Colors.Yellow,
      },
      {
        value: contentData.testStatus?.doneTests ?? 0,
        label: 'buildAccordion.testDone',
        color: Colors.Blue,
      },
    ];
  }, [
    contentData.testStatus?.errorTests,
    contentData.testStatus?.failTests,
    contentData.testStatus?.passTests,
    contentData.testStatus?.skipTests,
    contentData.testStatus?.doneTests,
    contentData.testStatus?.missTests,
  ]);

  const links = useMemo(
    () => [
      contentData.kernelImage
        ? {
            title: <FormattedMessage id="buildAccordion.kernelImage" />,
            icon: <MdFolderOpen className={blueText} />,
            linkText: <span>{`kernel/${contentData.kernelImage}`}</span>,
          }
        : undefined,
      contentData.kernelConfig
        ? {
            title: <FormattedMessage id="buildAccordion.kernelConfig" />,
            icon: <MdFolderOpen className={blueText} />,
            link: contentData.kernelConfig,
            linkText: <FormattedMessage id="buildAccordion.kernelConfigPath" />,
          }
        : undefined,
      contentData.dtb
        ? {
            title: <FormattedMessage id="buildAccordion.dtb" />,
            icon: <MdFolderOpen className={blueText} />,
            link: contentData.dtb,
            linkText: <FormattedMessage id="buildAccordion.dtbs" />,
          }
        : undefined,
      contentData.buildLogs
        ? {
            title: <FormattedMessage id="buildAccordion.buildLogs" />,
            icon: <MdFolderOpen className={blueText} />,
            link: contentData.buildLogs,
            linkText: <FormattedMessage id="buildAccordion.logs" />,
          }
        : undefined,
      contentData.systemMap
        ? {
            title: <FormattedMessage id="buildAccordion.systemMap" />,
            icon: <MdFolderOpen className={blueText} />,
            link: contentData.systemMap,
            linkText: <FormattedMessage id="buildAccordion.systemMapPath" />,
          }
        : undefined,
      contentData.modules
        ? {
            title: <FormattedMessage id="buildAccordion.modules" />,
            icon: <MdFolderOpen className={blueText} />,
            link: contentData.modules,
            linkText: <FormattedMessage id="buildAccordion.modulesZip" />,
          }
        : undefined,
    ],
    [
      contentData.buildLogs,
      contentData.dtb,
      contentData.kernelConfig,
      contentData.kernelImage,
      contentData.modules,
      contentData.systemMap,
    ],
  );

  return (
    <>
      <div className="flex flex-row justify-between">
        {chartElements.some(slice => slice.value > 0) && (
          <div className="min-w-[400px]">
            <StatusChartMemoized
              type="chart"
              title={<FormattedMessage id="buildAccordion.testStatus" />}
              elements={chartElements}
            />
          </div>
        )}
        <div className="flex flex-col gap-8">
          <LinksGroup links={links} />
          <Button
            variant="outline"
            className="w-min rounded-full border-2 border-black text-sm text-dimGray hover:bg-mediumGray"
            onClick={navigateToBuildDetails}
          >
            <FormattedMessage id="buildAccordion.showMore" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default AccordionBuildContent;
