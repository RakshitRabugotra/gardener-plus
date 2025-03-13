import { Stack, useLocalSearchParams } from 'expo-router'
import { useEffect, useMemo, useState } from 'react'
import { Image, View, StyleSheet, Text } from 'react-native'
import { useColorScheme } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome6'

// Internal dependencies
import { ThemedView } from '@/components/ui/ThemedView'
import { ThemedText } from '@/components/ui/ThemedText'
import { ThemedScrollView } from '@/components/ui/ThemedScrollView'
import { Collapsible } from '@/components/Collapsible'
import { ExternalLink } from '@/components/ExternalLink'
import { ThemedLabel } from '@/components/ui/ThemedLabel'

/*
For testing and development
*/
// import dummyPlant from '@/assets/dev/example.json'

// Custom utilities
import { getPlantFromID } from '@/lib/plants'
import { getPlantationConditions } from '@/lib/plants'
import { useThemeColor } from '@/hooks/useThemeColor'
import { addEllipses, capitalize, checkThumbnail } from '@/lib/util'
import { Colors } from '@/constants/Colors'

// Type definitions
import { PlantCareConditions, PlantFromID } from '@/types/plants'
import { AddFavorite } from '@/components/pages/home/FavoritePlants'

type Plant = PlantFromID | null
type CareConditions = PlantCareConditions | null

interface Props {
  plant: Plant
  plantConditions: CareConditions
}

export default function PlantInfo() {
  // The plant id from the query parameter
  const { plant: id } = useLocalSearchParams()

  // The state variables for plant info
  const [plant, setPlant] = useState<Plant>(
    null
    /*
    For development
    */
    // dummyPlant as PlantFromID
  )
  // and for plantation conditions
  const [plantConditions, setPlantConditions] = useState<CareConditions>(null)

  useEffect(() => {
    // Get the plants on change of 'id'
    getPlantFromID(parseInt(id as string))
      .then((value) => setPlant(value))
      .catch((reason) => console.log(reason))
  }, [id])

  useEffect(() => {
    // Get the conditions for plant growth from Gemini
    getPlantationConditions(
      plant ? plant.id : null,
      plant && plant.scientific_name ? plant.scientific_name[0] : null
    ).then((value) => setPlantConditions(value))
  }, [plant])

  return (
    <ThemedScrollView>
      <Stack.Screen
        options={{
          title: plant
            ? addEllipses(capitalize(plant.common_name))
            : 'The Plant',
          headerRight: () => <AddFavorite plant={plant} />,
        }}
      />
      {/* The four essentials from the care description */}
      <PlantInfoHero plant={plant} plantConditions={plantConditions} />

      {/* The other details about the specimen */}
      <PlantInfoEssentials plant={plant} plantConditions={plantConditions} />

      {/* Dummy for padding */}
      <View style={{ paddingBottom: 216 }}></View>
    </ThemedScrollView>
  )
}

function PlantInfoHero({ plantConditions, plant }: Props) {
  return (
    <ThemedView style={styles.attributeContainer}>
      <RangedAttributeInfoCard
        icon='cloud-sun'
        name={plantConditions ? 'sunlight' : null}
        min={plantConditions?.sunlight_hours_min}
        max={plantConditions?.sunlight_hours_max}
        units={'hrs'}
      />
      <RangedAttributeInfoCard
        icon='temperature-half'
        name={plantConditions ? 'temperature' : null}
        min={plantConditions?.temperature_min}
        max={plantConditions?.temperature_max}
        units={plantConditions?.temperature_unit}
      />
      <RangedAttributeInfoCard
        icon='circle-half-stroke'
        name={plantConditions ? 'soil' : null}
        min={plantConditions?.soil_ph_min}
        max={plantConditions?.soil_ph_max}
        units='pH'
      />
      <RangedAttributeInfoCard
        icon='plant-wilt'
        name={plantConditions ? 'height' : null}
        min={plant?.dimensions.min_value}
        max={plant?.dimensions.min_value}
        units={plant?.dimensions.unit}
      />
    </ThemedView>
  )
}

function RangedAttributeInfoCard({
  name,
  icon,
  units = '',
  min = 0,
  max = 0,
}: {
  name: string | null
  icon: string
  min?: number
  max?: number
  units?: string
}) {
  const colorScheme = useColorScheme()
  const tintColor = useThemeColor({}, 'tint')

  return (
    <ThemedView
      style={[
        styles.attributeBody,
        {
          backgroundColor: colorScheme === 'dark' ? Colors.light.text : '#fff',
        },
      ]}
    >
      <ThemedText style={[styles.icon, { backgroundColor: tintColor }]}>
        <Icon name={icon} size={24} color='black' />
      </ThemedText>
      <View style={styles.statContainer}>
        <Text
          style={[styles.stat, { color: Colors[colorScheme || 'light'].text }]}
        >{`${min} to ${max} ${units}`}</Text>
        <Text
          style={[
            styles.statTitle,
            { color: Colors[colorScheme || 'light'].text },
          ]}
        >
          {name ? name : 'loading...'}
        </Text>
      </View>
    </ThemedView>
  )
}

function PlantInfoEssentials({ plantConditions, plant }: Props) {
  // If we're unable to get the essentials, due to api limit exceeding
  if (!plant || !plantConditions) return <View></View>

  const hasThumbnail = useMemo(
    () => checkThumbnail(plant.default_image.thumbnail),
    [plant]
  )

  return (
    <ThemedView style={styles.informationContainer}>
      <View style={styles.introduction}>
        <View>
          <ThemedText type='title' style={styles.title}>
            {plant.scientific_name}
          </ThemedText>
          <ThemedText>{plantConditions.placement}</ThemedText>
        </View>
      </View>
      {/* The image of the plant if any */}
      {hasThumbnail && (
        <View style={styles.descriptionContainer}>
          <Image
            source={{ uri: plant.default_image.thumbnail }}
            style={styles.thumbnailImage}
          />
        </View>
      )}
      {/* The description of the plant */}
      <View style={styles.descriptionContainer}>
        {/* Show the description line by line */}
        {plant.description.split('. ').map((line, index) => (
          <ThemedText style={styles.description} key={index}>
            {line}
          </ThemedText>
        ))}
      </View>

      {/* The watering basis of the plant */}
      {plant.watering && (
        <View style={styles.subSection}>
          <ThemedText style={styles.subTitle}>{'Watering'}</ThemedText>
          <ThemedLabel>{plant.watering}</ThemedLabel>
        </View>
      )}

      {/* The care level for the plant */}
      <View style={styles.subSection}>
        <ThemedText style={styles.subTitle}>{'Care level'}</ThemedText>
        <ThemedLabel>{plant.care_level || 'Unknown'}</ThemedLabel>
      </View>

      {/* Where is it from (native) */}
      <View style={styles.descriptionContainer}>
        <ThemedText style={styles.subTitle}>Origins from</ThemedText>
        {/* The list of countries */}
        <View style={{ flexDirection: 'row' }}>
          {/* Show in two column format */}
          <View style={{ flexBasis: '50%' }}>
            {plant.origin
              .slice(plant.origin.length / 2)
              .map((country, index) => (
                <ThemedText key={index}>{country}</ThemedText>
              ))}
          </View>
          <View style={{ flexBasis: '50%' }}>
            {plant.origin
              .slice(0, plant.origin.length / 2)
              .map((country, index) => (
                <ThemedText key={index}>{country}</ThemedText>
              ))}
          </View>
        </View>
      </View>

      {/* Does it have? (FAQ) */}
      <PlantInfoFAQ plant={plant} />
    </ThemedView>
  )
}

function PlantInfoFAQ({ plant }: { plant: Plant }) {
  if (!plant) return <View />

  const colorScheme = useColorScheme()

  /**
   * The constants for the FAQs
   * TODO: shift it to the right place
   */
  const response = {
    yes: 'Yes!! ^-^',
    no: 'No... :(',
  }

  interface FAQ {
    title: string
    check: boolean
    response: {
      yes: string | React.JSX.Element
      no: string | React.JSX.Element
    }
  }

  const factors: FAQ[] = [
    {
      title: 'Does it have flowers?',
      check: plant.flowers,
      response: {
        ...response,
        yes: `Yes! ${
          plant.flower_color && 'of ' + plant.flower_color + ' color'
        } ${
          plant.flowering_season && 'in ' + plant.flowering_season + ' season'
        }`,
      },
    },
    {
      title: 'Does it bear fruits?',
      check: plant.fruits,
      response: {
        ...response,
        yes: `Yes! ${plant.fruit_color && 'of ' + plant.fruit_color} color`,
      },
    },
    {
      title: 'Is it medicinal?',
      check: plant.medicinal,
      response: {
        ...response,
        yes: (
          <>
            {`Yes!! ^-^: `}
            <ExternalLink
              href={`https://google.com/search?q=medicinal benefits of ${plant.scientific_name}`}
              style={{ textDecorationLine: 'underline' }}
            >
              Check here
            </ExternalLink>
          </>
        ),
      },
    },
    {
      title: 'Is it thorny?',
      check: plant.thorny,
      response,
    },
    {
      title: 'Is it tropical?',
      check: plant.tropical,
      response,
    },
  ]

  return (
    <View
      style={[
        styles.faq,
        {
          borderColor:
            colorScheme === 'dark' ? Colors.light.tabIconDefault : '#000',
          backgroundColor: colorScheme === 'dark' ? Colors.light.text : '#fff',
        },
      ]}
    >
      <ThemedText style={styles.title}>FAQ</ThemedText>
      <View>
        {factors.map((faq, index) => (
          <Collapsible title={faq.title} style={styles.faqTile} key={index}>
            <ThemedText>
              {faq.check ? faq.response.yes : faq.response.no}
            </ThemedText>
          </Collapsible>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontFamily: 'Display',
  },

  attributeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '1%',
    paddingHorizontal: 16,
    width: '100%',
  },
  attributeBody: {
    borderWidth: 2,
    borderRadius: 24,
    padding: 16,
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flexBasis: '40%',
  },
  description: {
    textAlign: 'justify',
    fontSize: 18,
  },
  descriptionContainer: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginVertical: 12,
    gap: 8,
  },
  faq: {
    padding: 12,
    margin: 12,
    gap: 16,
    borderWidth: 2,
    borderRadius: 12,
  },
  faqTile: {
    marginVertical: 8,
  },
  icon: {
    borderRadius: 999,
    padding: 12,
    width: 48,
    aspectRatio: 1,
    textAlign: 'center',
    marginRight: 'auto',
  },
  informationContainer: {
    padding: 16,
  },
  introduction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stat: {
    fontSize: 16,
  },
  statContainer: {
    marginTop: 16,
  },
  statTitle: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  subSection: {
    marginVertical: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 24,
    fontFamily: 'Display',
  },
  thumbnailImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
  },
})
