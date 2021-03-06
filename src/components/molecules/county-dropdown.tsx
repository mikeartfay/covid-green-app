import React, {forwardRef, RefObject, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TFunction} from 'i18next';

import {SelectorDropdown} from 'components/atoms/dropdown';
import {counties} from 'assets/counties';
import {AppIcons} from 'assets/icons';
import {TouchableWithoutFeedback} from 'react-native';

interface CountyOption {
  label: string;
  value: string;
}

const countyOptions: CountyOption[] = [];

for (const l of counties) {
  countyOptions.push({
    label: l.county,
    value: l.code
  });
}

interface CountyDropdownProps {
  value: string;
  onValueChange: (value: CountyOption) => void;
}

const withAllCounties = (t: TFunction, options: any[]): any[] => {
  return [{label: t('common:allCounties'), value: 'u'}, ...options];
};

const normalizeString = (s: string): string =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const CountyDropdown = forwardRef<
  TouchableWithoutFeedback,
  CountyDropdownProps
>(({value, onValueChange}, ref) => {
  const {t} = useTranslation();

  const [countyItems, setCountyItems] = useState<CountyOption[]>(countyOptions);

  const [countySearch, setCountySearch] = useState<string>('');

  const onCountySearchChanged = (searchTerm: string) => {
    const items = !searchTerm
      ? countyOptions
      : countyOptions.filter((c) =>
          normalizeString(c.value)
            .toLowerCase()
            .includes(normalizeString(searchTerm).toLowerCase())
        );
    setCountyItems(items);

    setCountySearch(searchTerm);
  };

  const onCountySelected = (county: string) => {
    if (county === value) {
      return;
    }
    onValueChange({label: county, value: county});
  };

  return (
    <SelectorDropdown
      ref={ref}
      icon={<AppIcons.Search width={20} height={20} />}
      label={t('county:label')}
      modalPlaceholder={t('county:dropdownPlaceholder')}
      items={withAllCounties(t, countyOptions)}
      value={value}
      onValueChange={onCountySelected}
      search={{
        placeholder: t('county:searchPlaceholder'),
        items: withAllCounties(t, countyItems),
        term: countySearch,
        onChange: onCountySearchChanged,
        noResults: t('county:noResults'),
        noResultsLength: 1,
        accessibilityLabel: (selectedItem?: string) =>
          t('county:accessibilityLabel', {
            county: selectedItem
          })
      }}
    />
  );
});
