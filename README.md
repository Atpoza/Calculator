# TR
# Hesap Makinesi
Bu uygulama dört işlem yapabilen JavaScript ile yazılmış bir Hesap Makinesidir 

## Özellikler
* 4 işlemle birden fazla ifadeden oluşan ifadeleri hesaplayabilir
* Yapılan işlemi Binary Tree'ye (İkili Ağaç) dönüştürür ve konsolda gösterir

> **Dikkat:** Bu uygulamada girilen veriler için hata ayıklama yoktur eğer hatalı veri girerseniz beklenmeyen sonuçlar alabilirsiniz  

## Yöntem
### 1.Tokenizasyon
Önce uygulama girilen veriyi Tokenlerden oluşan bir veri dizisine dönüştürür

### 2.Binary Tree
Sonra uygulama bu veri listesini işlem önceliğine göre ikili ağaç veri tipine dönüştürür ve konsola yazdırır
<br>10x2x2+5÷5 için Örnek Binary Tree:

<pre>
              +
             / \
            /   \
           /     \
          /       \
         *         ÷
        / \       / \
       /   \     /   \
       *    2   5     5
      / \
     /   \
     ÷    2
    / \
   /   \
  10    2
</pre>

### 3.İşlem
Sonrasında oluşan ikili ağaçın en altından başlanılarak en üstüne kadar işlemler yapılarak sonuca ulaşılır.

  
