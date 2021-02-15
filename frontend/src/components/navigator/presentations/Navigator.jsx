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

import React from 'react';
import PropTypes from 'prop-types';
import NavigatorItem from './NavigatorItem';

const Navigator = ({ menuList, activeMenuName, toggleMenu }) => {
  const menus = menuList.map((menuItem) => (
    <NavigatorItem
      itemInfo={menuItem}
      activeMenuName={activeMenuName}
      onClick={toggleMenu}
      key={menuItem.menuName}
    />
  ));
  return (
    <nav id="navbar" className="navbar navbar-expand-md fixed-left">
      <div className="collapse navbar-collapse " id="navbarsExampleDefault">
        <ul className="navbar-nav nav flex-column">
          {menus}
        </ul>
      </div>
    </nav>
  );
};

Navigator.propTypes = {
  menuList: PropTypes.arrayOf(PropTypes.shape({
    menuName: PropTypes.string, fwCode: PropTypes.string,
  })).isRequired,
  activeMenuName: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Navigator;
