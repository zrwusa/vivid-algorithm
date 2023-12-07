import * as React from 'react';
import {useState} from 'react';
import {proxyFactory} from '../../helpers/proxy-factory';
import {VividAlgorithm} from '../vivid-algorithm';
import LoadingButton from '@mui/lab/LoadingButton';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {TextField} from '@mui/material';
import {SVGOptions, ViewControl} from '../../types';

export interface AlgorithmPanelProps extends SVGOptions {
  algorithm: (...args: any[]) => any;
  testCase: any[];
  buttonLabel: string;
  referenceData?: any;
  relatedNodeKey?: string | undefined;
  relatedRouteKey?: string | undefined;
  isDebug?: boolean;
  children?: React.ReactNode;
  viewControl?: ViewControl;
}

export const AlgorithmPanel: React.FC<AlgorithmPanelProps> = ({
                                                                algorithm,
                                                                testCase,
                                                                buttonLabel = 'default',
                                                                relatedNodeKey,
                                                                referenceData,
                                                                relatedRouteKey,
                                                                children,
                                                                svgHeight: svgHeightProp,
                                                                svgWidth: svgWidthProp,
                                                                svgBg,
                                                                viewControl
                                                              }) => {
  const [values, setValues] = useState<{ [key in string]: unknown }>();
  const [loading, setLoading] = React.useState(false);
  const runClickHandler = async () => {
    setLoading(true);
    const result = await algorithm(...testCase, proxyFactory(setValues));
    console.log('Result : ', result);
    setLoading(false);
  };
  const [svgWidth, setSvgWith] = useState<string | number>(svgWidthProp ?? '100%');
  const [svgHeight, setSvgHeight] = useState<string | number>(svgHeightProp ?? 480);

  return (
    <Paper
      sx={{
        mb: 2,
        p: 2,
        flexGrow: 1,
        minHeight: 200,
        backgroundColor: theme => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff')
      }}
      style={{width: '100%'}}
    >
      <Grid container spacing={2} style={{width: '100%'}}>
        {/*<Grid item></Grid>*/}
        <Grid item xs={12} sm container style={{width: '100%'}}>
          <Grid item xs container direction='column' spacing={2} style={{width: '100%'}}>
            <Grid item xs>
              {children}
            </Grid>
            <Grid item xs>
              <TextField
                value={svgWidth}
                onChange={e => setSvgWith(e.target.value)}
                size='small'
                label='SVG Width'
                variant='outlined'
              />
              <TextField
                value={svgHeight}
                onChange={e => setSvgHeight(e.target.value)}
                size='small'
                label='SVG Height'
                variant='outlined'
              />
              <LoadingButton
                onClick={runClickHandler}
                loading={loading}
                loadingPosition='start'
                startIcon={<PlayCircleOutlineIcon/>}
                variant='contained'
                style={{textTransform: 'none'}}
              >
                <span>{buttonLabel}</span>
              </LoadingButton>
            </Grid>

            <Grid item style={{width: '100%'}}>
              {values ? (
                <VividAlgorithm
                  data={values}
                  relatedNodeKey={relatedNodeKey}
                  referenceData={referenceData}
                  svgHeight={svgHeight}
                  svgWidth={svgWidth}
                  svgBg={svgBg}
                  viewControl={viewControl}
                  relatedRouteKey={relatedRouteKey}
                />
              ) : null}
            </Grid>
          </Grid>
          {/*<Grid item></Grid>*/}
        </Grid>
      </Grid>
    </Paper>
  );
};
