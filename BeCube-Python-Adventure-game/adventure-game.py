# -*- coding: UTF-8 -*-
# Kin Péter - B csoport

# importok
from random import randint
from turtle import *


# függvények definiálása

#------------------------------------------------------------------------------------------
# VEZÉRLŐ ÉS SZÁMOLÓ FÜGGVÉNYEK
#------------------------------------------------------------------------------------------

def aranyat_talaltal(osszes_arany):
    # random aranyat találunk, de a játék elején nem találhatunk negatív számú
    # aranyat, illetve vizsgáljuk, hogy ne mehessünk 0 arany alá - ha megtörténne,
    # ilyenkor is csak pozitív aranyat találhatunk 
    global kezdeti
    # a játék elején a kapott arany pozitív lesz
    if kezdeti == True:
        kapott_arany = randint(1, 3)
        osszes_arany = osszes_arany + kapott_arany
        kezdeti = False
    else:
        kapott_arany = randint(-6, 6)
        # itt vizsgálom, hogy ne menjen az arany 0 alá
        if osszes_arany != 0 and (osszes_arany + kapott_arany <= 0 or osszes_arany - kapott_arany <= 0) :
            kapott_arany = randint(0, 6)
            osszes_arany = osszes_arany + kapott_arany
        else :
            kapott_arany = randint(-6, 6)
            osszes_arany = osszes_arany + kapott_arany

    # kiiratjuk a kapott aranyhoz tartozó üzeneteket egy külön függvénnyel
    aranyat_kiir(kapott_arany, osszes_arany)
    
    return osszes_arany


def utvalasztas():
    utvalasztas_kiir()
    
    # út kiválasztása
    valasztott_ut_szammal = 0

    while valasztott_ut_szammal < 1 or valasztott_ut_szammal > 3:
        valasztott_ut = input('1, 2, vagy 3? ')
        try:
            valasztott_ut_szammal = int(valasztott_ut)
        except ValueError:
            ervenytelen_kiir()
            continue

        if valasztott_ut_szammal < 1 or valasztott_ut_szammal > 3:
            ervenytelen_kiir()
        
    return valasztott_ut_szammal


def csapdat_valaszto(elet):
    # Ez a függvény akkor fut le, ha a játékos csapdára lépett. Ilyenkor az életeiből levon 1-et,
    # majd meghívja a kiíró függvényt
    uj_elet = elet - 1        # egy élet levonása 

    csapdat_kiir(uj_elet)     # megmaradt életek kiírása, vizsgálva azok számát
    
    return uj_elet            # visszatérés az életek új számával


def sorsol():
    # ezzel a függvénnyel egy random tárgyat talál a játékos 
    targyak = ['balta', 'bicska', 'kulacs', 'zsák', 'iránytű', 'csúzli', 'tűzkő', 'nyílvessző', 'páncél', 'bomba']
    talalt_targy = targyak[randint(0, len(targyak)-1)]

    talalt_targy_kiir(talalt_targy)
    
    return talalt_targy


def pontok_szama(targylista, pont_szotar):
    # pontértékeket ad a talált tárgyaknak, és azokat összeszámolja 
    pontszamok = 0

    for aktualis_targy in targylista :
        pontszamok += pont_szotar[aktualis_targy]

    return pontszamok


def targyat_szamol(targylista):
    # tárgylista kiírása - 1. függvény 
    # összeszámolja, melyk tárgyból hány darabot gyűjtöttünk 
    szamlista = []       # külön lista a darabszámoknak

    for elem in targylista:
        szamlista.append(targylista.count(elem))    # megszámolja az adott elemet és beteszi a számlistába

    return szamlista


def targylistat_osszerak(szamlista, targylista, pont_szotar):
    # tárgylista kiírása - 2. függvény """
    # készít egy külön listát a darabszámmal, tárgy nevével, és annak pontszámával 
    index = 0
    ujlista = []         # új lista amiben a darabszámok és tárgyak lesznek

    while index < len(targylista):
        if targylista[index] not in ujlista:   # ha adott elem még nem szerepel az új listán
            ujlista.append(szamlista[index])   # akkor egymás után beteszi a darabszámot és a tárgy nevét
            ujlista.append(targylista[index])
            ujlista.append(szamlista[index] * pont_szotar[targylista[index]])
            index += 1
        else:
            index += 1

    return ujlista


def bombat_talal(targylista):
    if 'bomba' in targylista:
        bombat_kiir()
        return True

    
#------------------------------------------------------------------------------------------
# KIÍRÓ FÜGGVÉNYEK
#------------------------------------------------------------------------------------------

def udvozlo_uzenet(jatekos):
    print('\n------------------------------------------------')
    print('  Üdv a játékomban, kedves ' +str(jatekos) + '!')
    print('------------------------------------------------')
    print('\nKerüld el a csapdákat, juss messzebb az erdőben! \n')

    
def bucsuzo_uzenet(megtett_tavolsag, gyujtott_arany, targylista):
    print('\n------------------------------------------------')
    print('     Sajnos vége a játéknak...')
    print('------------------------------------------------ \n')
    print('Megtett lépések: ' + str(megtett_tavolsag))
    print('Gyűjtött arany:  ' + str(gyujtott_arany))
    targy_kiir()
    print('\nElért pontszám: ' + str(pontok_szama(targylista, pont_szotar)))
    print('\n     Játsszunk legközelebb is! \n')

    rajzolj_piros_x()


def aranyat_kiir(kapott_arany, osszes_arany):
    # kiírja az üzenetet attól függően, mennyi aranyat talált vagy vesztett 
    if osszes_arany > 0 :
        if kapott_arany > 0 :
            talalos_szoveg_kiir()
            print('\nTaláltál ' + str(kapott_arany) + ' aranyat, jelenleg ' + str(osszes_arany) + ' aranyad van.')

        elif kapott_arany == 0 :
            print('\nNem találtál semmi értékeset. Jelenleg ' + str(osszes_arany) + ' aranyad van.')

        else:
            print('\nMíg nem figyeltél, elvesztettél ' + str(kapott_arany) + ' aranyat, jelenleg ' + str(osszes_arany) + ' aranyad van.')

    else:
        osszes_arany = 0
        print('\nBaj van, nem találod az aranyad... Mi történhetett??')


def talalos_szoveg_kiir():
    talalos_szoveg = randint(1, 3)
    if talalos_szoveg == 1 :
        print('Megbotlassz valamiben')
        print('Lenézel a lábad elé')
    elif talalos_szoveg == 2 :
        print('Hallasz egy koppanást a hátad mögött')
        print('Megfordulsz és lenézel a földre')
    elif talalos_szoveg == 3 :
        print('Csillogást látsz a fűben')
        print('Lehajolsz megnézni')    


def utvalasztas_kiir():
    print('\nÚtelágazáshoz értél. Három út van előtted...')
    print('De tudod, hogy az egyik csapdát rejt!')
    print('Merre indulsz?')    


def biztonsagos_kiir():
    print('\nBiztonságos út, továbbmehetsz')


def ervenytelen_kiir():
    print('Érvénytelen választás, próbáld újra')


def lepest_kiir(lepesek):
    print('\nEddig ' + str(lepesek) + ' lépést tettél meg.')


def csapdat_kiir(elet):
    # kiírja a csapda üzenetet attól függően, hány élet maradt 
    if elet > 0 :
        print('Csapda! Már csak ' + str(elet) + ' életed van!')
    else :
        print('Csapda! Sajnos meghaltál.')


def talalt_targy_kiir(talalt_targy):
    print('\nSéta közben találtál még valamit. A tárgy egy: ', talalt_targy)


def targy_kiir():
    # tárgylista kiírása - 3. függvény 
    # egymás alá kiírja a darabszámot, a tárgyakat és az össz pontértéket
    szamlista = targyat_szamol(targylista)   # meghívja a tárgyszámolós függvényt, hogy meglegyenek a darabszámok

    ujlista = targylistat_osszerak(szamlista, targylista, pont_szotar)   # meghívja a köv. függvényt, ami mindent összeszámol
    
    index = 0
    print('Talált tárgyak:')
    while index < len(ujlista):                # szép lista szerűen kiírja az összes adatot
        print(ujlista[index], ujlista[index+1], '/', ujlista[index+2], 'pont')
        index += 3


def bombat_kiir():
    print('Bombára léptél és felrobbantál, az összes életed elvette :\'(')


#------------------------------------------------------------------------------------------
# RAJZOLÓ FÜGGVÉNYEK
#------------------------------------------------------------------------------------------

def rajzolj(irany): 
    # Kirajzoljuk a megtett utat a turtle ablakban.
    # Ha 1-es utat választottunk, jobbra, ha 2-est, egyenesen, ha 3-mast, balra megyünk.
    pensize(3)
    if irany == 1:
        left(90)
    elif irany == 3:
        right(90)

    if valasztott_ut_szammal != csapda_ut:     # ha nem léptünk csapdára, feketével rajzol
        pencolor('black')
        forward(40)

    else:                                      # ha csapdára léptünk, piros szaggatottal
        pencolor('red')
        s = 0
        dot(15)
        while s < 5:
            pu(), fd(4), pd(), fd(4)
            s += 1


def rajzolj_piros_x():
    pencolor('red')
    dot(10), rt(45), fd(20), bk(40), fd(20), rt(90), fd(20), bk(40)   # piros X


#------------------------------------------------------------------------------------------
# ITT KEZDŐDIK A FŐ PROGRAM
#------------------------------------------------------------------------------------------

# változók megadása
kezdeti = True
arany = 0
eletek = 5
lepesek = 0
targylista = []
csapda_volt = 0
pont_szotar = {
        'balta' : 3,
        'bicska' : 2,
        'kulacs' : 1,
        'zsák' : 1,
        'iránytű' : 2,
        'csúzli' : 3,
        'tűzkő' : 2,
        'nyílvessző' : 1,
        'páncél' : 3,
        'bomba' : 0
        }

# kezdeti üzenetek kiírása
setheading(90)
nev = input('Mi a neved?')
udvozlo_uzenet(nev)

# aranyat találunk a játék elején
arany = aranyat_talaltal(arany)

# fő ciklus
while eletek > 0 :
    valasztott_ut_szammal = utvalasztas()

    # csapda kisorsolása - kétszer egymás után nem talál csapdát (csapda_volt változó)
    if csapda_volt > 1 :
        csapda_ut = randint(1, 3)
    else:
        csapda_ut = 0

    # ha csapdára lépett
    if valasztott_ut_szammal == csapda_ut :
        rajzolj(valasztott_ut_szammal)
        eletek = csapdat_valaszto(eletek)
        csapda_volt = 0

    # ha nem lépett csapdára
    else:
        biztonsagos_kiir()
        csapda_volt += 1
        
        # rajzoló függvény meghívása
        rajzolj(valasztott_ut_szammal)

        # aranyat találunk függvénnyel
        arany = aranyat_talaltal(arany)

        # tárgyat találunk, melyet berakunk az inventory-ba (targylista)
        targylista.append(sorsol())

        # vizsgáljuk, találtunk-e bombát
        if bombat_talal(targylista):
            break

        # talált tárgyak listájának kiírása pontszámokkal
        targy_kiir()

        # megtett lépések növelése és kiírása
        lepesek = lepesek + 1
        lepest_kiir(lepesek)

# ha elfogy az életünk                
bucsuzo_uzenet(lepesek, arany, targylista)
