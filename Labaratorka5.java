import java.util.*;

class Person {
    String lastName;
    String firstName;
    int birthYear;
    int birthMonth;

    public Person(String lastName, String firstName, int birthYear, int birthMonth) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.birthYear = birthYear;
        this.birthMonth = birthMonth;
    }

    @Override
    public String toString() {
        return String.format(
                "Фамилия: %s, Имя: %s, Год рождения: %d, Месяц рождения: %d",
                lastName, firstName, birthYear, birthMonth
        );
    }
}

public class Labaratorka5 {
    public static void main(String[] args) {
        Person[] people = {
                new Person("Ivanov", "Ivan", 1990, 5),
                new Person("Petrov", "Petr", 1985, 3),
                new Person("Sidorov", "Alex", 1978, 12),
                new Person("Smith", "John", 1995, 7)
        };

        // Самый старый человек
        Person oldest = findOldest(people);
        System.out.println("Самый старый: " + oldest);

        // Средний возраст и люди старше среднего
        double averageAge = getAverageAge(people);
        System.out.println("\nСредний возраст: " + averageAge);
        System.out.println("Люди старше среднего:");
        for (Person p : people) {
            if (2024 - p.birthYear > averageAge) {
                System.out.println(p);
            }
        }

        // Сортировка по фамилии (обратный порядок)
        Arrays.sort(people, (p1, p2) -> p2.lastName.compareTo(p1.lastName));
        System.out.println("\nПосле сортировки:");
        for (Person p : people) {
            System.out.println(p);
        }

        // Поиск и редактирование
        Scanner scanner = new Scanner(System.in);
        System.out.print("\nВведите фамилию для поиска: ");
        String searchName = scanner.nextLine();

        Person found = findPerson(people, searchName);
        if (found != null) {
            System.out.println("Найден: " + found);
            System.out.print("Введите новое имя: ");
            found.firstName = scanner.nextLine();
            System.out.println("После редактирования: " + found);
        } else {
            System.out.println("Человек не найден");
        }
    }

    static Person findOldest(Person[] people) {
        Person oldest = people[0];
        for (Person p : people) {
            if (p.birthYear < oldest.birthYear ||
                    (p.birthYear == oldest.birthYear && p.birthMonth < oldest.birthMonth)) {
                oldest = p;
            }
        }
        return oldest;
    }

    static double getAverageAge(Person[] people) {
        int total = 0;
        for (Person p : people) {
            total += 2024 - p.birthYear;
        }
        return (double) total / people.length;
    }

    static Person findPerson(Person[] people, String lastName) {
        for (Person p : people) {
            if (p.lastName.equalsIgnoreCase(lastName)) {
                return p;
            }
        }
        return null;
    }
}