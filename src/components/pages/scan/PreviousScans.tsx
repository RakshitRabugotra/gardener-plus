import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Section } from '@/components/Section'
import { ImageCard, ImageCardProps } from '@/components/ui/ImageCard'
import { PlantScan } from '@/types/plants'
import { useCallback, useEffect, useRef, useState } from 'react'
import { getScans, removeScan } from '@/service/storage'
import { Href } from 'expo-router'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  SNAP_POINT_TYPE,
} from '@gorhom/bottom-sheet'
import { PaddedView } from '@/components/ui/PaddedView'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from '@rneui/themed'
import { Ionicons } from '@expo/vector-icons'

export const PreviousScans = () => {
  const [scans, setScans] = useState<PlantScan[]>([])
  // For the bottom modal
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  // To handle the modal changes
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  // To open the modal
  const handlePresentModalPress = useCallback(() => {
    console.log('bottom: ', bottomSheetRef.current)
    bottomSheetRef.current?.present()
  }, [])

  // To delete some scan
  const deleteScan = useCallback(
    (id: string) => {
      // Extract this scan
      const thisScan = scans.find((scan) => scan.id === id)
      // If it is not found, then return
      if (!thisScan) return

      // First remove the scan from the list
      const newScans = scans.filter((scan) => scan.id !== id)
      // Update the scans
      setScans(newScans)

      // Then try to remove this scan
      removeScan(id, true)
        // If it is successful, then don't do anything
        // Else, catch error and restore the scans
        .catch((err) => {
          console.error('Error while deleting scan: ', err)
          return setScans([thisScan, ...newScans])
        })
    },
    [scans, setScans]
  )

  // To get the scans and refresh
  const refreshScans = () =>
    getScans()
      .then((storageScans) => storageScans && setScans(storageScans))
      .catch((error) =>
        console.error(
          'Error while setting scans in PreviousScans ' + error?.toString()
        )
      )

  // TO get the scans previously done
  useEffect(() => {
    refreshScans()
  }, [])

  return (
    <>
      <ScanList scans={scans} onSeeMore={handlePresentModalPress} />
      {/* And the bottom sheet to show more */}
      <BottomSheetModalProvider>
        <BottomSheetModal ref={bottomSheetRef} onChange={handleSheetChanges}>
          <BottomSheetView style={styles.modalContentContainer}>
            <ScrollView style={styles.scrollView}>
              <PaddedView
                style={{
                  marginVertical: 12,
                  gap: 16,
                  paddingBottom: 250,
                  backgroundColor: 'transparent',
                }}
              >
                {!scans || scans.length === 0 ? (
                  <EmptyScanCard horizontal />
                ) : (
                  scans.map((scan, index) => (
                    <ScanCard
                      horizontal
                      {...scan}
                      endContent={
                        <DeleteButton onPress={() => deleteScan(scan?.id)} />
                      }
                      key={scan?.id + '-' + index}
                    />
                  ))
                )}
              </PaddedView>
            </ScrollView>
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  )
}

const DeleteButton = ({ onPress }: { onPress: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        position: 'relative',
        height: '100%',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
      hitSlop={10}
    >
      <Ionicons name='trash' color={'#4d4d4d'} size={22} />
    </TouchableOpacity>
  )
}

const ScanList = ({
  scans,
  onSeeMore,
}: {
  scans: PlantScan[]
  onSeeMore: () => void
}) => {
  return (
    <Section
      title='Previous scans'
      moreOptions={
        scans && scans.length > 0
          ? {
              text: 'See all',
              onPress: onSeeMore,
            }
          : undefined
      }
    >
      <FlatList
        horizontal
        data={scans}
        renderItem={({ item }) => <ScanCard {...item} key={item?.id} />}
        keyExtractor={(item) => item?.id?.toString() ?? 0}
        ListEmptyComponent={<EmptyScanCard />}
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 12 }}
        contentContainerStyle={{ gap: 16 }}
      />
    </Section>
  )
}

const ScanCard = ({
  image,
  plantCommonName,
  plantScientificName,
  ...props
}: PlantScan & Partial<ImageCardProps>) => (
  <ImageCard
    {...props}
    text={plantCommonName}
    imageSrc={image}
    href={
      plantScientificName
        ? (('/search?name=' + plantScientificName) as Href)
        : undefined
    }
    styles={{
      base: {
        overflow: 'hidden',
        borderRadius: 12,
      },
      image: {
        aspectRatio: 1,
        overflow: 'hidden',
        borderRadius: 12,
      },
      text: {
        maxWidth: '80%',
        textOverflow: 'wrap',
        marginHorizontal: 'auto',
      },
    }}
  />
)

const EmptyScanCard = ({ text, ...props }: Partial<ImageCardProps>) => (
  <ImageCard
    text='Search plants to add'
    styles={{
      text: {
        paddingHorizontal: 16,
        fontSize: 14,
        maxWidth: 150,
        textOverflow: 'wrap',
      },
      image: {
        width: 50,
        height: 50,
        margin: 30,
        marginHorizontal: 'auto',
      },
    }}
    {...props}
  />
)

const styles = StyleSheet.create({
  modalContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
})
