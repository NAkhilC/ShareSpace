import React, { useState, FlatList, useRef } from 'react';
import { View, Text, StyleSheet, LogBox, SafeAreaView, Dimensions, ScrollView, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { themeColors } from '../../styles/base';
import { styles } from '../../styles/mainCss';
import Ionicons from "@expo/vector-icons/Ionicons";


const OptionsGroup = (props) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [flattenItems, setFlattenItems] = useState([]);
  const flatListRef = useRef(null);

  const items = [
    {
      name: 'Advanced',
      id: 200,
      // these are the children or 'sub items'
      children: [
        {
          name: 'Balcony',
          id: 1,
        },
        {
          name: 'Basement',
          id: 2,
        },
        {
          name: 'BBQ',
          id: 3,
        },
        {
          name: 'Microwave',
          id: 4,
        },
        {
          name: 'Tv',
          id: 5,
        }, {
          name: 'Coffee maker',
          id: 6,
        },
        {
          name: 'Refrigerator',
          id: 7,
        },
        {
          name: 'Closet',
          id: 8,
        },
        {
          name: 'Dresser',
          id: 9,
        },
        {
          name: 'Couch',
          id: 10,
        },
        {
          name: 'Chair',
          id: 11,
        },
        {
          name: 'Firepit',
          id: 12,
        },
        {
          name: 'Patio',
          id: 13,
        }, {
          name: 'Snow blower',
          id: 14,
        },
        {
          name: 'Oven',
          id: 15,
        },
        {
          name: 'Storage place',
          id: 16,
        },
        {
          name: 'Swimming pool',
          id: 17,
        }, {
          name: 'Hot tub',
          id: 18,
        },
        {
          name: 'Secured entry',
          id: 19,
        },
        {
          name: 'Toster',
          id: 20,
        },
        {
          name: 'Air frier',
          id: 21,
        },
        {
          name: 'Oil frier',
          id: 21,
        }
      ],
    },

  ];

  React.useEffect(() => {
    props.setFormData({ ...props.formData, advancedItems: selectedItems })
  }, [selectedItems])

  return (
    <View style={[styles.inputTextBoxItem, { width: '100%' }]}>
      <SafeAreaView style={styles.multiselectDropDown}>
        <SectionedMultiSelect
          items={items}
          styles={{
            selectToggleText: styles.renderTextToggle,
            button: { backgroundColor: themeColors.primary },
            container: { marginBottom: 200 },
            chipsWrapper: styles.renderChipWrapper,
            chipContainer: styles.renderChipContainer,
            chipText: {
              color: 'white',
              padding: 5,
              marginTop: 2,
              height: 30
            },
            chipIcon: {
              color: 'white'
            },
          }}
          IconRenderer={Icon}
          selectToggle={{ color: '#f79334' }}
          single={false}
          uniqueKey="name"
          subKey="children"
          showDropDowns={true}
          expandDropDowns={true}
          hideConfirm={false}

          customChipsRenderer={(item) => {
            return (

              <ScrollView style={{ height: 100 }} horizontal={true}>
                <View style={styles.renderCustomChip}>
                  {selectedItems.map((val, item) => {
                    return (<View key={item} style={styles.displayFlex}>
                      <View style={[styles.renderEachChip, styles.displayFlex]}><Text style={styles.renderChipValue}>{val}</Text>
                        <Pressable onPress={() => {
                          setSelectedItems(selectedItems.filter(itemToRemove => { return itemToRemove != val }));
                        }}>
                          <View style={{ padding: 3, marginLeft: 5 }}>
                            <Ionicons name="close-circle" size={20} color="white" />
                          </View>
                        </Pressable>
                      </View>
                    </View>)
                  })}
                </View>
              </ScrollView>
            )
          }}
          showChips={true}
          readOnlyHeadings={true}
          modalWithSafeAreaView={true}
          selectChildren={true}
          highlightChildren={true}
          selectToggleTextColor={themeColors.primary}
          onSelectedItemsChange={(test) => {
            setSelectedItems(test)
          }}
          selectedItems={selectedItems}
        />
      </SafeAreaView>
    </View>
  );
};


export default OptionsGroup;
