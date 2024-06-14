import React from 'react';
import { Tabs as ChakraTabs, TabList, TabPanels, Tab as ChakraTab, TabPanel } from '@chakra-ui/react';

export default function Tabs({ tabIndex, setTabIndex, tabs, tabPanels, name }) {

    return (
      <ChakraTabs data-testid={`tabs-${name}`} index={tabIndex} onChange={(index) => setTabIndex(index)}>
        <TabList>
            {tabs.map((tab, index) => (
                <ChakraTab key={index}>{tab}</ChakraTab>
            ))}
        </TabList>
        <TabPanels p='2rem'>
            {tabPanels.map((tabPanel, index) => (
                <TabPanel key={index}>{tabPanel}</TabPanel>
            ))}
        </TabPanels>
      </ChakraTabs>
    )
  }