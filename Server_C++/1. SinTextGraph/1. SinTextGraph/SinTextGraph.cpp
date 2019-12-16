#include <iostream>
#include <cmath>
#include <Windows.h>

using namespace std;

int main() {
	while (1)
	{
		// 5도 단위로 * 찍기
		for (int iAngle = 0; iAngle < 180; iAngle += 5) {
			double dRadian = iAngle * 3.14 / 180;

			// sin값 까지 *찍음
			for (double dStar = 0.0; dStar < sin(dRadian); dStar += 0.015)
				cout << "*";

			Sleep(20);
			cout << endl;
		}
	}
}