import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Share,
  Platform
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSafeArea} from 'react-native-safe-area-context';

import Icons, {AppIcons} from 'assets/icons';
import {colors, text} from 'theme';
import {TFunction} from 'i18next';
import {useRoute, NavigationProp, useNavigationState} from '@react-navigation/native';

interface NavBarProps {
  navigation: any;
  scene: any;
  placeholder?: boolean;
  modal?: boolean;
}

export const shareApp = async (t: TFunction) => {
  try {
    await Share.share(
      {
        title: t('common:message'),
        message:
          Platform.OS === 'android' ? t('common:url') : t('common:message'),
        url: t('common:url')
      },
      {
        subject: t('common:name'),
        dialogTitle: t('common:name')
      }
    );
  } catch (error) {
    console.log(t('tabBar:shareError'));
  }
};

export const NavBar: FC<NavBarProps> = ({
  navigation,
  placeholder,
  modal = false
}) => {
  const {t} = useTranslation();
  const insets = useSafeArea();
  const {key: routeKey, name} = useRoute();
  const routes = useNavigationState(state => state.routes);
  const index = routes.findIndex((route) => route.key === routeKey);
  const hasHistory = !placeholder && index > 0;

  return (
    <View style={[styles.wrapper, {paddingTop: insets.top + 2}]}>
      <View style={styles.container}>
        <View style={[styles.col, styles.left]}>
          {hasHistory && (
            <TouchableWithoutFeedback
              accessibilityRole="button"
              accessibilityHint={t('navbar:backHint')}
              onPress={() => navigation.goBack()}>
              <View
                hitSlop={{left: 12, right: 12, top: 8, bottom: 8}}
                style={styles.back}>
                {!modal && (
                  <>
                    <AppIcons.Back
                      width={18}
                      height={18}
                      color={colors.white}
                    />
                    <Text allowFontScaling={false} style={styles.backText}>
                      {t('navbar:back')}
                    </Text>
                  </>
                )}
                {modal && (
                  <AppIcons.Close width={18} height={18} color={colors.white} />
                )}
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
        <View style={[styles.col, styles.center]}>
          <Icons.LogoNav width={92} height={36} color={colors.text} />
        </View>
        <View style={[styles.col, styles.right]}>
          <TouchableWithoutFeedback
            accessibilityRole="button"
            accessibilityLabel={t('navbar:share')}
            onPress={() => shareApp(t)}>
            <View style={styles.settings}>
              <AppIcons.Share width={24} height={24} color={colors.white} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: colors.purple
  },
  background: {
    flex: 1,
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    maxHeight: 62
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  col: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  left: {
    width: '25%',
    alignItems: 'flex-start',
    paddingLeft: 12
  },
  center: {
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  right: {
    width: '25%',
    alignItems: 'flex-end',
    paddingRight: 12
  },
  back: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  backText: {
    ...text.default,
    marginLeft: 5,
    textAlign: 'left',
    color: colors.white
  },
  settings: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  iconSize: {
    width: 24,
    height: 24
  },
  logoSize: {
    width: 92,
    height: 36
  },
  shareText: {
    ...text.default,
    textAlign: 'center',
    color: colors.white
  }
});
