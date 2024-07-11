# Algebraic Effects

什么是 Algebraic Effects？代数效应？很可惜我不知道，正如我可能永远也搞不明白什么是「Monad 就是自函子范畴上的一个幺半群」一样，不过在看完这篇《[Algebraic Effects for the Rest of Us](https://overreacted.io/algebraic-effects-for-the-rest-of-us/)》后，我大概明白了以下几点：

1. 外部环境影响实际效果。
2. 和 Monad 一样，能用以处理副作用，但更加灵活。
3. React 中的 `<Suspense>`、Hooks、Context 机制与 Algebraic Effects 相符合。
4. 还能用于测试。

「Talk is cheap. Show me the code.」于是便尝试使用 JS 中的 Generator 机制模拟实现。

## 目录结构

- `main.ts`：代码实现。
- `main.test.ts`：测试用例。

## Todo

最好能使用上下文结构引入不同 handler，而不是简单粗暴的数组。

## 许可证

该项目采用 MIT 许可证。详情请参阅 [LICENSE](LICENSE) 文件。
