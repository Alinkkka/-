import java.util.Arrays;

public class Labaratorka4 {
    public static void main(String[] args) {
        // Пример входного массива
        double[] A = {1.5, 2.0, 3.5, 4.0, 5.5};
        System.out.println("Исходный массив: " + Arrays.toString(A));

        // Пятикратное сглаживание
        for (int i = 0; i < 5; i++) {
            smoothArray(A);
            System.out.println("После сглаживания " + (i + 1) + ": " + Arrays.toString(A));
        }
    }

    // Метод для однократного сглаживания массива
    public static void smoothArray(double[] arr) {
        // Сохраняем предыдущее значение
        double prev = arr[0];

        for (int i = 1; i < arr.length; i++) {
            double current = arr[i]; // Сохраняем текущее значение
            arr[i] = prev + current; // Заменяем текущий элемент суммой
            prev = current;          // Обновляем предыдущее значение
        }
    }
}