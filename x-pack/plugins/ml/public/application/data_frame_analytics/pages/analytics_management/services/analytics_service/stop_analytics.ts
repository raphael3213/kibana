/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { i18n } from '@kbn/i18n';
import { getToastNotifications } from '../../../../../util/dependency_cache';
import { ml } from '../../../../../services/ml_api_service';

import { refreshAnalyticsList$, REFRESH_ANALYTICS_LIST_STATE } from '../../../../common';

import type { DataFrameAnalyticsListRow } from '../../components/analytics_list/common';
import { isDataFrameAnalyticsFailed } from '../../components/analytics_list/common';

export const stopAnalytics = async (d: DataFrameAnalyticsListRow) => {
  const toastNotifications = getToastNotifications();
  try {
    await ml.dataFrameAnalytics.stopDataFrameAnalytics(
      d.config.id,
      isDataFrameAnalyticsFailed(d.stats.state)
    );
    toastNotifications.addSuccess(
      i18n.translate('xpack.ml.dataframe.analyticsList.stopAnalyticsSuccessMessage', {
        defaultMessage: 'Request to stop data frame analytics {analyticsId} acknowledged.',
        values: { analyticsId: d.config.id },
      })
    );
  } catch (e) {
    toastNotifications.addDanger(
      i18n.translate('xpack.ml.dataframe.analyticsList.stopAnalyticsErrorMessage', {
        defaultMessage:
          'An error occurred stopping the data frame analytics {analyticsId}: {error}',
        values: { analyticsId: d.config.id, error: JSON.stringify(e) },
      })
    );
  }
  refreshAnalyticsList$.next(REFRESH_ANALYTICS_LIST_STATE.REFRESH);
};
