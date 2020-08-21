import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Markdown} from 'components/atoms/markdown';
import {Scrollable} from 'components/templates/scrollable';
import {KeepSafeIcons} from 'assets/icons';

const map: {[key: number]: any} = Object.entries(KeepSafeIcons).reduce(
  (p, c, i) => {
    return {
      ...p,
      [i]: c[1]({width: 48, height: 48})
    };
  },
  {}
);

function renderListBullet(index: number, _: boolean, children: any) {
  return (
    <View key={`list-item-${index}`} style={styles.listIcon}>
      <View style={styles.icon}>{map[index]}</View>
      <View style={styles.content}>{children}</View>
    </View>
  );
}

export const CloseContactInfo: FC = () => {
  const {t} = useTranslation();
  return (
    <Scrollable heading={t('closeContactInfo:title')}>
      <Markdown renderListBullet={renderListBullet}>
        {t('closeContactInfo:info')}
      </Markdown>
    </Scrollable>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginRight: 12
  },
  content: {
    flex: 1
  },
  listIcon: {
    flexDirection: 'row',
    flex: 1,
    marginRight: 12,
    marginTop: 12
  }
});
