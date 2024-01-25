function bottleitgood(end) {
    while (end > 0) {
        if (end > 1) {
            console.log(end + ' bottles of beer on the wall, ' + end + ' bottles of beer. \nTake one down and pass it around, ' + (end-1) + ' bottles of beer on the wall.\n')
        } else {
            console.log('One bottle of beer on the wall, One bottle of beer.\nTake one down and pass it around, 1 bottle of beer on the wall.\n')
        }

        end--;
    }

    console.log("No bottles of beer on the wall, No bottles of beer. \nGo to the store and buy some more, 99 bottles of beer on the wall.")
    
}

bottleitgood(100)