/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import { UsersTableType } from '../../store/model';
import { navTabsUsersDetails } from './nav_tabs';

describe('navTabsUsersDetails', () => {
  test('it should not display anomalies tab if user has no ml permission', () => {
    const tabs = navTabsUsersDetails('username', false);

    expect(tabs).not.toHaveProperty(UsersTableType.anomalies);
    expect(tabs).toHaveProperty(UsersTableType.risk);
  });
});
