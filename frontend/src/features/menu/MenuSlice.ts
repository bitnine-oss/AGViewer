/* eslint-disable no-param-reassign */
/*
 * Copyright 2020 Bitnine Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { createSlice } from '@reduxjs/toolkit';
import { faCog, faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const MenuSlice = createSlice({
  name: 'navigator',
  initialState: {
    menuList: [
      ['home', faHome],
      ['setting', faCog],
      ['about', faInfoCircle],
    ],
    activeMenu: 'home',
    isActive: true,
  },
  reducers: {
    toggleMenu: {
      reducer: (state, action) => {
        let isActive = true;
        if (state.activeMenu === action.payload.selectedMenuName) {
          action.payload.selectedMenuName = '';
          isActive = false;
        }
        state.activeMenu = action.payload.selectedMenuName;
        state.isActive = isActive;
      },
      prepare: (selectedMenuName) => ({ payload: { selectedMenuName } }),
    },
  },
});

export const { toggleMenu } = MenuSlice.actions;

export default MenuSlice.reducer;
